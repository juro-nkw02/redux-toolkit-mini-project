import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GameForm from './pages/GameForm';
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Providers/ProtectedRoute';
import LoginConfirmRoute from './Providers/LoginConfirmRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path='login'
            element={
              <LoginConfirmRoute>
                <Login />
              </LoginConfirmRoute>
            }
          />
          <Route
            path='register'
            element={
              <LoginConfirmRoute>
                <Signup />
              </LoginConfirmRoute>
            }
          />
          <Route path='/games/'>
            <Route
              path='create'
              element={
                <ProtectedRoute>
                  <GameForm />
                </ProtectedRoute>
              }
            />
            <Route
              path=':id'
              element={
                <ProtectedRoute>
                  <GameForm />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
