import React, { useState, useEffect } from 'react';
import conf_contacts from '../conf/conf_contacts';
import Loader from './Loader';
function GoogleContacts() {
  const [contacts, setContacts] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls dialog visibility
  const [searchTerm, setSearchTerm]     = useState('');
  const [loader,setLoader]              = useState(false);
 
  useEffect(() => {
    // Load the gapi and gis scripts dynamically
    const loadGapiAndGis = () => {
      const script1 = document.createElement('script');
      script1.src = "https://apis.google.com/js/api.js";
      script1.onload = () => gapi.load('client', initializeGapiClient);
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = "https://accounts.google.com/gsi/client";
      script2.onload = initializeGisClient;
      document.body.appendChild(script2);
    };

    loadGapiAndGis();
  }, []);

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: conf_contacts.apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/people/v1/rest'],
    });
  };

  const initializeGisClient = () => {
    window.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: conf_contacts.clientId,
      scope: 'https://www.googleapis.com/auth/contacts.readonly',
      callback: handleAuthClick,
    });
  };

  const handleAuthClick = async (response) => {
    if (response.error) throw response;
    setIsAuthorized(true);
    setLoader(true);
    await listContacts();
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const listContacts = async () => {
    let allConnections = [];
    let nextPageToken = null;

    // Loop to handle pagination
    do {
      const response = await gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses,phoneNumbers',
        pageSize: 100, // Fetch in batches; 100 is the maximum allowed per request
        pageToken: nextPageToken,
      });

      const connections = response.result.connections || [];
      allConnections = [...allConnections, ...connections]; // Accumulate contacts
      nextPageToken = response.result.nextPageToken; // Update next page token

    } while (nextPageToken);

    // Map and sort the contacts by name
    const sortedContacts = allConnections
      .map((person) => {
        const name = person.names && person.names.length > 0 ? person.names[0].displayName : 'Unnamed';
        const phone = person.phoneNumbers && person.phoneNumbers.length > 0 ? person.phoneNumbers[0].value : 'No Phone';
        
        return { name, phone };
      })
      .sort((a, b) => (a.name || 'Unnamed').localeCompare(b.name || 'Unnamed')); // Sort alphabetically by name with a fallback

    setContacts(sortedContacts);
    setLoader(false);
    setIsDialogOpen(true); // Open dialog when contacts are set
  };

  const handleInvite = (contact) => {
    // Function to handle the invite action
    alert(`Invite sent to ${contact.name} at ${contact.phone}`);
  };
 
  
  return (
    <div>
      <button
        onClick={() => window.tokenClient.requestAccessToken()}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-200"
      >
        Sync Contacts
      </button>
      {
        loader && <Loader/>
      }
      {/* Dialog Box for Contacts */}
      {isDialogOpen && !loader(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Contacts</h2>
  
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
  
            <div className="max-h-80 overflow-y-auto">
              {filteredContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center mb-4 p-2 border-b">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-gray-600">{contact.phone}</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded" onClick={()=>alert(`alert sent to ${contact.name} at ${contact.phone}`)}>
                    Invite
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default GoogleContacts;
