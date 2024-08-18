import { BASE_URL } from "./AxiosConfig";


export async function createUserProfile(userProfile) {
    try {
        const formData = new FormData();
        
        // Append all properties of userProfile to the FormData object
        for (const key in userProfile) {
            if (userProfile.hasOwnProperty(key)) {
                formData.append(key, userProfile[key]);
            }
        }

        const response = await BASE_URL.post('/create-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        // Improved error handling
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // No response was received
            console.error('Error request:', error.request);
        } else {
            // Error setting up the request
            console.error('Error message:', error.message);
        }
        throw error;
    }
}