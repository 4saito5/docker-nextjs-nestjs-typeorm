import { useEffect } from 'react';
import Head from 'next/head'
import { GlobalStyles, css } from 'twin.macro'
import { Global } from '@emotion/react'
import { AppProps } from 'next/app'
import { isLoggingIn } from '../lib/isLoggingIn';
import { isPermission } from '../lib/isPermission';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { adminUserState } from '../stores/atoms';
import { useRouter } from 'next/router';

/**
 * 全ページで必要な処理を書く
 *   useRecoilState <RecoilRoot> の子コンポーネントで呼び出さないとエラーになるので、別コンポーネント化した。
 */
 function AppInit() {
  const router = useRouter();
  const setAdminUser = useSetRecoilState(adminUserState);

  useEffect(() => {
    // ここに全ページ共通で行う処理を書く

    /**
     * ログイン状態チェック
     * @return {JSON} - 管理ユーザー情報
     */
    const loggingInCheck = async () => {
      if (router.pathname === '/login') {
        return true;
      }
      const apiResult = await isLoggingIn();
      if (typeof apiResult.adminLoginId !== 'undefined') {
        setAdminUser({
          adminLoginId: apiResult.adminLoginId,
          adminUserName: apiResult.adminUserName,
          regionCode: apiResult.regionCode,
        });
        if (router.pathname === '/') {
          router.push('/home');
        }
        return apiResult;
      } else {
        // router.push('/login');
        return false;
      }
    };

    /**
     * 画面権限チェック
     * @param {JSON} adminUser - 管理ユーザー情報
     */
    const permissionCheck = async (adminUser: any) => {
      try {
        const exclusionPath = [
          '/login',
          '/error'
        ];
        console.log(router.pathname);
        if (exclusionPath.includes(router.pathname) === false) {
          if (typeof adminUser === 'boolean') {
            if (adminUser) {
            } else {
              router.push('/login');
            }
          } else if (await isPermission(adminUser.adminLoginId, router.pathname)) {
            // NOP
          } else {
            router.push('/error');
          }
        }
      } catch (err) {
        // console.log(err);
      }
    };

    loggingInCheck().then((adminUser) => {
      permissionCheck(adminUser);
    });
  }, []);

  return null;
}

/**
 * 全ページ共通コンポーネント
 */
function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>
          スタンペイ申込み管理画面
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyles />
      <Global styles={globalStyles} />
      <RecoilRoot>
        <Component {...pageProps} />
        <AppInit />
      </RecoilRoot>
    </>
  );
}

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`

export default App
