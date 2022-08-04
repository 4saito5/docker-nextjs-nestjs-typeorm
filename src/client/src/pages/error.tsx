import tw, { css } from 'twin.macro';

/**
 * エラー画面
 */
export default function Error() {
  return (
    <div css={container}>
      <h1>エラーが発生しました。</h1>
      <div>もう一度やり直してください。</div>
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
