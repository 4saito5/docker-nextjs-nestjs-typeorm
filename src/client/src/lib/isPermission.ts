import { apiClient } from './apiClient';

/**
 * 画面権限チェック
 *   ユーザーにアクセ権限があるか確認する
 * @return {boolean} - true: アクセス権限有り
 */
export default async function isPermission(id: string, path: string) {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    try {
      const apiResult = await apiClient.post(
        '/get_permission',
        {
          adminLoginId: id,
          screenUrl: path,
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );
      if (typeof apiResult.data.permission === 'undefined') {
        throw new Error('request error: /get_permission');
      }
      if (!apiResult.data.permission) {
        throw new Error('request permission false.');
      }
      return true;
    } catch (err) {
      // console.log(err);
      return false;
    }
  } else {
    return false;
  }
}

export { isPermission }
