import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router'
import { apiClient } from '../lib/apiClient';
import { useSetRecoilState } from 'recoil';
import { adminUserState } from '../stores/atoms';

interface IFormInputs {
  username: string
  password: string
}

const schema = yup.object({
  username: yup.string().required('必須項目です'),
  password: yup.string().required('必須項目です'),
}).required();

/**
 * ログイン画面
 */
export default function Login() {
  const router = useRouter();
  const setAdminUser = useSetRecoilState(adminUserState);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [loginMessage, setMessage] = useState('');

  /**
   * ログイン処理
   * @param {IFormInputs} data - 画面入力項目
   */
  const onSubmit = async (data: IFormInputs) => {
    setMessage('');
    try {
      let apiResult = await apiClient.post('/auth/login', data);
      // console.log(apiResult);
      if (typeof apiResult.data.access_token === 'undefined') {
        throw new Error('request error: /auth/login');
      }
      const accessToken = apiResult.data.access_token;
      apiResult = await apiClient.get(
        '/profile',
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );

      // console.log(apiResult);
      if (typeof apiResult.status === 'undefined') {
        throw new Error('request error: /profile');
      }
      if (apiResult.status !== 200) {
        throw new Error('request status error: ' + apiResult.status);
      }
      setAdminUser({
        adminLoginId: apiResult.data.adminLoginId,
        adminUserName: apiResult.data.adminUserName,
        regionCode: apiResult.data.regionCode,
      });

      localStorage.setItem('access_token', accessToken);

      router.push('/home');
      return;
    } catch (err) {
      // console.log(err);
    }
    setMessage('ログインに失敗しました。');
  }

  return (
    <div css={container}>
      <form css={form} onSubmit={handleSubmit(onSubmit)}>
        <h1 css={title}>スタンペイ申込み管理画面 ログイン</h1>
        <label>ユーザー名</label>
        <input aria-label='username' css={input} {...register('username')} autoFocus={true} />
        <p css={error}>{errors.username?.message}</p>
        <label>パスワード</label>
        <input aria-label='password' type='password' css={input} {...register('password')} />
        <p css={error}>{errors.password?.message}</p>
        <button aria-label='login' type='submit' css={loginButton} disabled={!isValid || isSubmitting}>ログイン</button>
        <p data-testid='loginMessage' css={error}>{loginMessage}</p>
      </form>
    </div>
  );
}

const container = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  background: rgba(darken($primary,40%), 0.85);
`
const form = css`
  border-radius: 2px 2px 5px 5px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
`

const title = css`
  color: #444;
  font-size: 1.2em;
  margin: 10px 0 30px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`

const input = css`
  ${tw`rounded px-2 py-1`}
  width: 100%;
  padding: 8px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`

const loginButton = css`
  &:enabled {
    ${tw`bg-blue-500 text-white rounded px-2 py-1`}
    box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0 0px 0;
  },
  &:disabled {
    ${tw`bg-gray-200 text-gray-400 rounded px-2 py-1`}
    box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0 0px 0;
  },
`

const error = css`
  color: red;
  font-size: 1em;
  padding: 0;
  margin: 0;
`
