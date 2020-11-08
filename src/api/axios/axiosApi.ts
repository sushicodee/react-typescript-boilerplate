import axios from 'axios';
import { getItem } from 'components/utils/localStorage/LocalStorage';

const http = axios.create({
  // baseURL: 'http://localhost:5000/api' ,
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

const httpHeaders = (isSecure) => {
  let options = {
    'Content-Type': 'application/json',
  };
  if (isSecure) {
    options['Authorization'] = getItem('token');
  }
  return options;
};

const get = (url, { params = {} } = {}, isSecure = false) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        headers: httpHeaders(isSecure),
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const post = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data, { headers: httpHeaders(isSecure), params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const put = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise((resolve, reject) => {
    http
      .put(url, data, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const patch = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise((resolve, reject) => {
    http
      .patch(url, data, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const remove = (url, isSecure) => {
  return new Promise((resolve, reject) => {
    http
      .delete(url, { headers: httpHeaders(isSecure) })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const uploadFile = (method, url, data, files) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    if (files && files.length) {
      formData.append('image', files[0], files[0].name);
    }

    for (let key in data) {
      if (typeof data[key] === 'object') {
        continue;
      }
      formData.append(key, data[key]);
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log('req cycle compoleted', xhr.response);
        if (xhr.status === 200) {
          console.log('success');
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.open(method, url, true);
    xhr.send(formData);
  });
};

export const axiosApi = { get, post, put,patch, remove, uploadFile };
