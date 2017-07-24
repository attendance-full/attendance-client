import invariant from 'invariant';
import isomorphicFetch from 'isomorphic-fetch';
import is from 'is_js';
import config from '../../config';

export const buildUrl = (path) => config.serviceUrl + path;

class FetchTimedOutError extends Error { }

export const fetch = (url, options = {}) => {
  invariant(is.string(url), 'url must be a string');
  invariant(is.object(options), 'options must be a plain object');

  return new Promise((resolve, reject) => {
    const onTimeout = () => reject(new FetchTimedOutError(`Call to ${url} has taken too long!`));
    const timeout = setTimeout(onTimeout, '20000');
    isomorphicFetch(url, options)
      .then(checkResponseStatus)
      .then(parseResponse)
      .then((response) => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

function checkResponseStatus(response) {
  if (response.ok) {
    return response;
  }
}

function parseResponse(rawResponse) {
  return rawResponse.text()
    .then((response) => {
      try {
        return JSON.parse(response);
      } catch (e) {
        return response;
      }
    });
}

class Api { }

Api.fetch = fetch;
Api.buildUrl = buildUrl;
