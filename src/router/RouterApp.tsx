import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import ProgressPage from '../components/ProgressPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import TableBaseContainer from '../components/TableBaseContainer';
import AuthPage from '../pages/Auth/auth-page';
import Prueba from '../pages/Character/Prueba';

const CharacterListPage = lazy(() => import('../pages/Character/character-page'));

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prueba" element={<Prueba />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectTo="/home">
              <Suspense fallback={<ProgressPage />}>
                <AuthPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/table" element={<TableBaseContainer />} />
        <Route
          path="home"
          element={
            <ProtectedRoute redirectTo="/login">
              <Suspense fallback={<ProgressPage />}>
                <CharacterListPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
