
import axios from "axios";
import { baseUrl, baseUrlnpc, gs1Url } from './config.jsx';

const newRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,

});

export default newRequest;


const newRequestnpc = axios.create({
  baseURL: baseUrlnpc,
  withCredentials: true,
});
export { newRequestnpc };


const newRequestgs1 = axios.create({
  baseURL: gs1Url,
  withCredentials: true,
});

export { newRequestgs1 };