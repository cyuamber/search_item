import 'fetch-detector';
import 'fetch-ie8';

const Fetch = {};
Fetch.getJSON = resource => fetch(resource.url + '?' + _.map(resource.params, (item, key) => key + '=' + item).join('&'), {
  credentials: 'include'
});
Fetch.getHTML = Fetch.getJSON;

Fetch.post = resource => fetch(resource.url, {
  method: 'post',
  body: _.map(resource.params, (item, key) => key + '=' + item).join('&'),
  credentials: 'include'
});

Fetch.postForm = resource => fetch(resource.url, {
  method: 'post',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: _.map(resource.params, (item, key) => key + '=' + item).join('&')
});

Fetch.postJSON = resource => fetch(resource.url, {
  method: 'post',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(resource.params)
});

Fetch.postFile = resource => {
  const formData = new FormData();
  _.map(resource.params, (item, key) => formData.append(key, item))
  return fetch(resource.url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  });
};

export default Fetch;
