import http from './httpService';
import config from '../config.json';


function movieURL(id){
  return `${config.apiURL}/movies/${id}`
}

function getMovies() {
  return http.get(`${config.apiURL}/movies`);
}

function getMovie(id) {
  return http.get(movieURL(id));
}

function saveMovie(movie) {

  if( movie._id ){
    const body = {...movie};
    delete body._id;
    return http.put(movieURL(movie._id), body);
  }

  return http.post(`${config.apiURL}/movies`, movie);
}

function deleteMovie(id) {
  return http.delete(movieURL(id));
}

export { getMovies, getMovie, saveMovie, deleteMovie };