import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set) => (
    {
        user: null,
        isSignIn: false,
        signin: async (credentials) => {
            set({ isSignIn: true });
            try {
              const response = await axios.post('http://localhost:3001/api/v1/users/register', credentials);
              const user = response.data.user; // Access the user from response.data
              set({ user, isSignIn: false });
              toast.success(`Welcome, ${user.username}!`); // Display a success message with the username
            } catch (error) {
              const errorMessage =
                error.response?.data?.message || 'SignIn failed. Please try again later.';
              toast.error(errorMessage);
              set({ isSignIn: false, user: null });
            }
          },
        
        




        login: async () => {},
        logout: async () => {},
        authCheck: async () => {},
    }
))
