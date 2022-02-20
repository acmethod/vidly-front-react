import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../config.json';

const tokenKey = 'token';

http.setJWT(getJWT());

async function login(email, password){
   const response = await http.post(`${config.apiURL}/auth`, { email, password });

   const jwt = response.data;

   localStorage.setItem(tokenKey, jwt);
}

function logout(){
  localStorage.removeItem(tokenKey);
}

function loginWithJWT(jwt){
  localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser(){
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJWT(){
  return localStorage.getItem(tokenKey);
}

const auth = { login, logout, getCurrentUser, loginWithJWT, getJWT };

export default auth;