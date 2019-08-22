import axios from 'axios';
import { API } from './config';

const restClient = () => {
  // Create instance
  const instance = axios.create();
  const token = localStorage.getItem('token');
  // Set the AUTH token for any request
  instance.interceptors.request.use(axiosConfig => {
    const current = axiosConfig;

    if (
      axiosConfig.url.indexOf('courses') === 0 &&
      (axiosConfig.method.toUpperCase() === 'POST' || axiosConfig.method.toUpperCase() === 'PUT')
    ) {
      // hack for the form-data upload, ugly backend api force this to be here.
      current.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      current.headers.Accept = '*/*';
      axiosConfig.transformRequest = data => {
        const str = [];
        Object.keys(data).forEach(key =>
          str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        );
        return str.join('&');
      };
    }

    current.headers.Authorization = `Bearer ${token}`;
    current.url = `${API}/${axiosConfig.url}`;
    console.log(current);
    return current;
  });

  return instance;
};

export default restClient;
