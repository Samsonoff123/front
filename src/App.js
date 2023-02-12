import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Login from './components/page/Login';
import PageRouter from './components/PageRouter';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
    </div>
  );
}

export default App;
