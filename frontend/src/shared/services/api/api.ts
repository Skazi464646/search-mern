import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { SearchResponse, AutocompleteResponse, SearchParams } from '@/shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        
        // Handle specific error cases
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        
        if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        
        if (error.response?.data?.error?.message) {
          throw new Error(error.response.data.error.message);
        }
        
        throw new Error('An unexpected error occurred');
      }
    );
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    debugger
    const response = await this.api.get<SearchResponse>('/search', { params });
    return response.data;
  }

  async autocomplete(query: string, limit = 5): Promise<AutocompleteResponse> {
    const response = await this.api.get<AutocompleteResponse>('/search/autocomplete', {
      params: { q: query, limit },
    });
    return response.data;
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.api.get('/health');
    return response.data.data;
  }
}

export const apiService = new ApiService();