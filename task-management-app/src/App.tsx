import { Routes, Route } from 'react-router';
import Dashboard from './screens/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Providers from './providers';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './screens/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path={'/dashboard'}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={'/login'} element={<Login />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
