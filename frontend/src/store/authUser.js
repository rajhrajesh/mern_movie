import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set) => (
    {
        user: null,
        isSignIn: false,
        isLoggingIn: false,
        isCheckIn: true,
        signin: async (credentials) => {
          set({ isSignIn: true });
            try {
              const response = await axios.post('/api/v1/users/register', credentials);
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

        login: async (credentials) => {
          set({isLoggingIn: true})
          try {
              const response = await axios.post('/api/v1/users/login', credentials);
              const { token, user } = response.data;
              localStorage.setItem('authToken', token);
              set({ user: user, isLoggingIn: false });
              console.log(user)
              toast.success(`Welcome back, ${user.username}!`);
          } catch (error) {
              const errorMessage =
                  error.response?.data?.message || 'LogIn failed. Please try again later.';
              toast.error(errorMessage);
              console.error('Login error:', error);
              set({ isLoggingIn: false, user: null });
          }
      },
      
        logout: async () => {
          
          try {
              await axios.post('/api/v1/users/logout');
              localStorage.removeItem('authToken'); // Clear local storage
              
              toast.success('Logout successful');
          } catch (error) {
              toast.error('Logout failed. Please try again.');
              console.error('Logout error:', error);
          }
      },
      
      // myprofile: async () => {
      //   set({ isCheckIn: true }); // Start loading
      //   console.log('Fetching profile...');

      //   try {
      //     const response = await axios.get('/api/v1/users/myprofile'); // Adjust the endpoint
      //     const user = response.data.user; // Assume `user` is returned from the response
      //     set({ user, isCheckIn: false }); // Set user and stop loading
      //     toast.success('Profile fetched successfully');
      //   } catch (error) {
      //     console.error(error); // Log errors if any

      //     const errorMessage =
      //       error.response?.data?.message || 'Failed to fetch profile. Please try again later.';
      //     toast.error(errorMessage);
      //     set({ user: null, isCheckIn: false }); // Ensure loading stops even on error
      //   }
      // },

      myprofile: async () => {
        set({ isCheckIn: true }); // Set loading state to true
        try {
          const response = await axios.get('/api/v1/users/myprofile');
          console.log("Profile response:", response.data); // Log the response

          set({ user: response.data.user, isCheckIn: false }); // Set user from response
        } catch (error) {
          set({ isCheckIn: false, user: null }); // Set to null if error occurs
          toast.error(error.response?.data?.message || "Failed to fetch profile.");
        }
      },
      
      
    }
))
