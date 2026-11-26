import {fetchData} from '../utils/fetchData';

const AUTH_API = import.meta.env.VITE_AUTH_API;

//login hook
const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(AUTH_API + '/auth/login', fetchOptions);
    // save the token for later requests that need authentication
    localStorage.setItem('token', loginResult.token);
    return loginResult;
  };

  return {postLogin};
};

//authentication hook for registering a new user
const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputs),
    };
    return await fetchData(AUTH_API + '/users', fetchOptions);
  };
    const getUserByToken = async (token) => {
    const result = await fetchData(AUTH_API + '/auth/me', {
      headers: {Authorization: 'Bearer ' + token},
    });
    return result.user;
  };

  return {postUser, getUserByToken};
};

export {useAuthentication, useUser};