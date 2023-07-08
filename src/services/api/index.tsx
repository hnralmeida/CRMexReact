import axios from 'axios';
import ENV from '../../../env';

const url = ENV.BASE_URL;
console.log("Axios", url);

const Api = axios.create({
    baseURL: 'http://192.168.0.89:4003/',
});

export default Api;