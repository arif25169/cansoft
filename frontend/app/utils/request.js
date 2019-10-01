import 'whatwg-fetch';
// import { BASE_TOKEN_URL } from './serviceUrl';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
 // console.log('1st Response ', response);
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  ////Only for Token Submit 
  //  if(response.url ==  BASE_TOKEN_URL.concat('/netiapi/eduman/yIE8Hi8N4CFM/addOrEditToken')){
  //  // console.log("inside IFFF");
  //   return response.status;
  // }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
  var loginUrl = newURL + '#/login';
  // console.log(newURL);
  // console.log(loginUrl);
  if (response.status >= 200 && response.status < 400) {
    //console.log(response);
    return response;
  }
  if (response.status == 401) {
    window.location.href = loginUrl;
   // window.location.href='/#/login';
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
