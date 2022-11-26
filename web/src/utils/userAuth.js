/* eslint-disable no-unused-expressions */
const userAccessToken = 'user_access_token';
const userIntendedUrl = '/';
const defaultUserIntendedUrl = '/';

export const getUserToken = () =>
  window.localStorage.getItem(userAccessToken);

export const setUserToken = (token) => {
  token
    ? window.localStorage.setItem(userAccessToken, token)
    : window.localStorage.removeItem(userAccessToken);
};

export const removeUserToken = () => {
  window.localStorage.removeItem(userAccessToken);
};

export const getUserIntendedUrl = () =>
  window.localStorage.getItem(userIntendedUrl) ||
  defaultUserIntendedUrl;

export const setUserIntendedUrl = (url) => {
  url
    ? window.localStorage.setItem(userIntendedUrl, url)
    : window.localStorage.removeItem(userIntendedUrl);
};
