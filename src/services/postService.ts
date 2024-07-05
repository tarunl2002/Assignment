import axios from 'axios';
import { Post } from '../types/Post';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
};
