import { Routes, Route } from 'react-router';
import Dashboard from './screens/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './screens/NotFound';
import Providers from './providers';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './screens/Home';
import NavBar from './components/NavBar';
import Settings from './screens/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <NavBar />
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
          <Route
            path={'/settings'}
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
