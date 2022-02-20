import http from './httpService';
import config from '../config.json';

function register(user){
  return http.post(`${config.apiURL}/users`, { 
      email : user.username,
      password: user.password,
      name: user.name
  });
}

export { register };
