import { apiClient } from './apiClient';

/**
 * ログイン状態チェック
 *   アクセストークンが有効か確認する
 * @return {boolean} - true: アクセストークン有効
 */
export default async function isLoggingIn() {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    try {
      const apiResult = await apiClient.get(
        '/profile',
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );
      if (typeof apiResult.status === 'undefined') {
        throw new Error('request error: /profile');
      }
      if (apiResult.status !== 200) {
        throw new Error('request status error: ' + apiResult.status);
      }
      return apiResult.data;
    } catch (err) {
      // console.log(err);
      return false;
    }
  } else {
    return false;
  }
}

export { isLoggingIn }
