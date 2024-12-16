import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
function FriendSelector({  formik }) {
  const friends = useSelector(state=>state.friends.list)
  const [query, setQuery] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const currentUsername = useSelector((state)=>state.user.user.username)
  useEffect(() => {
    // Set filtered friends to show all friends initially or filter by query
    setFilteredFriends(
      query
        ? friends.filter((friend) =>
            friend.username.toLowerCase().includes(query.toLowerCase())
          )
        : friends
    );
  }, [query, friends]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  };
  // THis is amazing
  const handleFriendSelect = (friend) => {
    if (!formik.values.selectedFriends.includes(friend.username)) {
      formik.setFieldValue('selectedFriends', [
        ...formik.values.selectedFriends,
        friend.username,
      ]);
    }
    setQuery(''); // Clear the search input
  };

  const handleRemoveFriend = (username) => {
    formik.setFieldValue(
      'selectedFriends',
      formik.values.selectedFriends.filter((name) => name !== username)
    );
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">Split with</label>
      <div className="mt-2 space-y-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search friends..."
          value={query}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        

        {/* Selected Friends */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formik.values.selectedFriends
          .filter((username)=>username!=currentUsername)
          .map((username) => (
            <div
              key={username}
              className="flex items-center px-2 py-1 bg-indigo-100 text-indigo-500 rounded-full"
            >
              <span>{username}</span>
              <button
                type="button"
                onClick={() => handleRemoveFriend(username)}
                className="ml-2 text-indigo-700 hover:text-indigo-500"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {formik.touched.selectedFriends && formik.errors.selectedFriends ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.selectedFriends}</div>
        ) : null}

        {/* Suggested Friends */}
        {query && (
          <div className="mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => handleFriendSelect(friend)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {friend.username}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No friends found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendSelector;