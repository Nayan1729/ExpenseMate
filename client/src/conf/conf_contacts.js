const  conf_contacts = {
    apiKey          : String(import.meta.env.VITE_GOOGLE_API),
    clientId        : String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    clientSecret    : String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    redirectUrl     : String(import.meta.env.VITE_GOOGLE_REDIRECT_URL),
    baseUrl         : String(import.meta.env.VITE_BACKEND_BASE_URL),
};
export default conf_contacts;