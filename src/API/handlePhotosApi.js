import axios from 'axios';
import { IMAGE_API_KEY } from '../config/environment';
const base_url = 'https://api.pexels.com/v1';

export const getImagesFromAPI = async (searchTerm = 'programming') =>
  await axios.get(`${base_url}/search?query=${searchTerm}`, {
    headers: {
      Authorization: IMAGE_API_KEY,
    },
  });
