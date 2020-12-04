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
    if (!response.ok) throw new Error(`failed to fetch ${url}${argString}`);

    const json = await response.json();
    return json;
  } catch (error) {
    return Promise.reject(error?.msg || error);
  }
};

export default fetch;
