import type { InternalAxiosRequestConfig } from 'axios';

import { TOKEN } from '../pages/Auth/constants/auth-constants.constant';

export const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = sessionStorage.getItem(TOKEN);
  if (token) {
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
  }
  return config;
};
