import { css } from 'twin.macro';
import { useRecoilValue } from 'recoil';
import { adminUserState } from '../stores/atoms';

/**
 * ホーム画面
 */
export default function Home() {
  const adminUser = useRecoilValue(adminUserState);
  return (
    <div css={container}>
      <h1 css={title}>スタンペイ申込み管理画面 メニュー</h1>
      <div>{adminUser.adminLoginId}</div>
      <div>{adminUser.adminUserName}</div>
      <div>{adminUser.regionCode}</div>
    </div>
  );
}

const container = css`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const title = css`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;

  & a {
    color: #0070f3;
    text-decoration: none;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`
