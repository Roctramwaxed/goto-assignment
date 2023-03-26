/** @jsxImportSource @emotion/react */
import { RouterProvider } from 'react-router-dom';
import { css } from '@emotion/react'
import router from './routes';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    localStorage.setItem('pagination', '1')
  }, [])

  return (
    <div className="App" css={style}>
      <RouterProvider router={router} />
    </div>
  );
}

const style = css`
background-color: #03ac0e;
height: 100vh;
text-align: center;
padding: 5%;
`

export default App;
