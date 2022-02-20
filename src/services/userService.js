import http from './httpService';

function register(user){
  return http.post(`/users`, { 
      email : user.username,
      password: user.password,
      name: user.name
  });
}

export { register };
