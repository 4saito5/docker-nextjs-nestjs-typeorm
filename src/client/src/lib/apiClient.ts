import axios from 'axios';
import mockAdapter from '../../test/__mocks__/axiosAdapter'

/**
 * HTTP Client
 * @return {AxiosInstance} -
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/admin',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'region-code': process.env.NEXT_PUBLIC_REGION_CODE ? process.env.NEXT_PUBLIC_REGION_CODE : '',
  },
  adapter: mockAdapter,   // テスト時に差し替えるモック
});
