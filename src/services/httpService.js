import axios from 'axios';
import logger from './loggerService';
import { toast } from 'react-toastify';


axios.defaults.baseURL = process.env.REACT_APP_API_URL;
 
// Intercept unexpected errors
axios.interceptors.response.use( 
  function (response) {
    return response;
  }, 
  function ( error ){
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError){
      logger.log(error);
      toast.error('An unexpected error occured.');
    }

    return Promise.reject(error);
  }
);


function setJWT(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt; 
}

const http = { 
  post: axios.post,
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  setJWT
}

export default http;