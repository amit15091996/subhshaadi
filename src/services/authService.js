import axios from 'axios';

export default class authService {
    constructor(protectedInterceptor) {
        this.protectedInterceptor = protectedInterceptor;
    }

    async registerUser(userProfile) {
        try {
            const formData = new FormData();
            // Append all properties of userProfile to FormData
            for (const key in userProfile) {
                if (userProfile.hasOwnProperty(key)) {
                    formData.append(key, userProfile[key]);
                }
            }

            const response = await this.protectedInterceptor.post('auth/create-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response?.data;
        } catch (error) {
            // Enhanced error handling
            console.error('Error creating user profile:', error.response || error.message || error);
            throw error; // Rethrow error to be handled by calling function
        }
    }

    async getData() {
        try {
            const response = await axios.get("http://localhost:7878/api/v1/admin/get-search-data", {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4ODcxNjQxMjg2IiwiaWF0IjoxNzIzNzg1MDAzLCJleHAiOjE3MjM4NzE0MDN9.U7nAW8r-Ekc3FIBP5rfxixtr5mUM0jWISuqvC1c5NAk", // Replace with actual token management logic
                },
            });

            return response.data;
        } catch (error) {
            // Enhanced error handling
            console.error('Error fetching data:', error.response || error.message || error);
            throw error; // Rethrow error to be handled by calling function
        }
    }
}
