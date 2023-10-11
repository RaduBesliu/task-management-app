import { AuthContext } from './providers/AuthProvider/context';
import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './screens/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import Login from './screens/Login';

const App = () => {
  const { user, signInWithGoogle, signOutWithGoogle } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
