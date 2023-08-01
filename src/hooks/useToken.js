import { useState } from 'react';
import {
  getLocalStorageService,
  setLocalStorageService,
} from '../services/LocalStorageService';

const useToken = () => {
  const getToken = () => {
    let userToken = getLocalStorageService();
    return userToken;
  };

  let [token, setToken] = useState(getToken());

  let saveToken = (userToken) => {
    setLocalStorageService(userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token: token,
  };
};

export default useToken;
