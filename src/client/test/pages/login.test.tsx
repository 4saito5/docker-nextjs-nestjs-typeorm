import React from 'react';
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { AxiosAdapter } from 'axios';
import mockAdapter from '../__mocks__/axiosAdapter';
import Login from '../../src/pages/login';

// モック関数を作成
// axios
jest.mock('../__mocks__/axiosAdapter', () => jest.fn());
const axiosMockAdapter = (mockAdapter as unknown) as jest.Mock<
  ReturnType<AxiosAdapter>,
  Parameters<AxiosAdapter>
>;
// router
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();
useRouter.mockImplementation(() => {
  return { push }
});


describe('Login', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    // 準備処理
    // テスト対象Componentの描画
    renderResult = render(<Login />);
    // タイマーをフェイクのものに差し替える
    jest.useFakeTimers();
  });
  afterEach(() => {
    // テスト終了後処理
    // タイマーを通常に戻す
    jest.useRealTimers();
    // テスト対象のアンマウント
    renderResult.unmount();
  });

  describe('初期状態', () => {
    test('フォームの見出しが表示されている', async () => {
      expect(renderResult.getByRole('heading')).toBeTruthy();
    });

    test('ログインボタンが非活性状態になっている', async () => {
      // const loginButton = await screen.getByLabelText('login');
      // // console.log(loginButton);
      // expect(loginButton).toBeDisabled();
      expect(renderResult.getByLabelText('login')).toBeDisabled();
    });
  });

  describe('バリデーションチェック', () => {
    test('ユーザー名のみ入力', async () => {
      // ユーザー名
      const usernameInput = renderResult.getByLabelText('username');
      await act( async () => {
        fireEvent.change(usernameInput, {target: {value: 'test'}});
      });
      expect(usernameInput).toHaveValue('test');

      // ログインボタンが非活性状態になっている
      expect(renderResult.getByLabelText('login')).toBeDisabled();
    });

    test('パスワードのみ入力', async () => {
      // パスワード
      const passwordInput = renderResult.getByLabelText('password');
      await act( async () => {
        fireEvent.change(passwordInput, {target: {value: 'test1234'}});
      });
      expect(passwordInput).toHaveValue('test1234');

      // ログインボタンが非活性状態になっている
      expect(renderResult.getByLabelText('login')).toBeDisabled();
    });

    test('すべての入力項目を入力', async () => {
      // ユーザー名
      const usernameInput = renderResult.getByLabelText('username');
      await act( async () => {
        fireEvent.change(usernameInput, {target: {value: 'test'}});
      });
      expect(usernameInput).toHaveValue('test');

      // パスワード
      const passwordInput = renderResult.getByLabelText('password');
      await act( async () => {
        fireEvent.change(passwordInput, {target: {value: 'test1234'}});
      });
      expect(passwordInput).toHaveValue('test1234');

      // ログインボタンが活性状態になっている
      expect(renderResult.getByLabelText('login')).not.toBeDisabled();
    });
  });

  describe('ログイン処理', () => {
    test('ログイン失敗', async () => {
      // ログインAPIリクエストのモック
      const response = {
        status: 401,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          statusCode: 401,
          message: 'Unauthorized',
        }
      }
      axiosMockAdapter.mockResolvedValueOnce(response);

      // ユーザー名
      const usernameInput = renderResult.getByLabelText('username');
      await act( async () => {
        fireEvent.change(usernameInput, {target: {value: 'test'}});
      });
      expect(usernameInput).toHaveValue('test');

      // パスワード
      const passwordInput = renderResult.getByLabelText('password');
      await act( async () => {
        fireEvent.change(passwordInput, {target: {value: 'test1234a'}});
      });
      expect(passwordInput).toHaveValue('test1234a');

      const loginButton = await screen.getByLabelText('login');
      await act( async () => {
        fireEvent.click(loginButton);
      });
      await act( async () => {
        jest.advanceTimersByTime(5000);   // 5000ミリ秒経過させる
      });

      const loginMessageElement = renderResult.getByTestId('loginMessage');
      expect(loginMessageElement).toHaveTextContent('ログインに失敗しました。');
    });

    test('ログイン成功', async () => {
      // ログインAPIリクエストのモック
      const response = {
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {},
        data: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkxvZ2luSWQiOiJ0ZXN0Iiwic3ViIjoiMDAyIiwiaWF0IjoxNjQxMjkxMjAyLCJleHAiOjE2NDEyOTE4MDJ9.-u_s13gW8DgkTX3lHH_kn7dOXSEDAhn6wIpyRvt1uYE',
        }
      }
      axiosMockAdapter.mockResolvedValueOnce(response);
      // ログインAPIリクエストのモック
      const response2 = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          adminLoginId: 'test'
        }
      }
      axiosMockAdapter.mockResolvedValueOnce(response2);

      // ユーザー名
      const usernameInput = renderResult.getByLabelText('username');
      await act( async () => {
        fireEvent.change(usernameInput, {target: {value: 'test'}});
      });
      expect(usernameInput).toHaveValue('test');

      // パスワード
      const passwordInput = renderResult.getByLabelText('password');
      await act( async () => {
        fireEvent.change(passwordInput, {target: {value: 'test1234'}});
      });
      expect(passwordInput).toHaveValue('test1234');

      const loginButton = await screen.getByLabelText('login');
      await act( async () => {
        fireEvent.click(loginButton);
      });
      await act( async () => {
        jest.advanceTimersByTime(5000);   // 5000ミリ秒経過させる
      });

      const loginMessageElement = renderResult.getByTestId('loginMessage');
      expect(loginMessageElement).not.toHaveTextContent('ログインに失敗しました。');
    });
  });
})
