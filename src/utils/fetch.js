import nodeFetch from 'node-fetch';

const fetch = async (args) => {
  const {
    url,
    headers = {},
    args: queryArgs = {},
  } = args;

  const argString = Object
    .keys(queryArgs)
    .map((key, i) => `${!i ? '?' : ''}${key}=${queryArgs[key]}`)
    .join('&');

  try {
    const response = await nodeFetch(encodeURI(`${url}${argString}`), headers);
    if (!response.ok) return Promise.reject(new Error(`failed to fetch ${url}${argString}`));

    const json = await response.json();
    return json;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fetch;
