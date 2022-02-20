import http from './httpService';
import config from '../config.json'


function getGenres() {   
  return http.get(`${config.apiURL}/genres`);
}

export { getGenres };