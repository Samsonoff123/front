import { useEffect, useState } from 'react';
import './App.scss';
import Login from './components/page/Login';
import PageRouter from './components/PageRouter';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
  }, [])

  if (!isAuth) {
    return (
      <Login setIsAuth={setIsAuth} />
    )
  }

  return (
    <div>
      <PageRouter />
    </div>
  );
}

export default App;
