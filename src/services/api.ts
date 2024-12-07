import axios from 'axios';
import {Hotel} from '../types/types';

const api = axios.create({
  baseURL: 'https://technology.lastminute.com/api',
});

export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await api.get('/hotel.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
