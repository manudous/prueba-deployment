import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { switchRoutes } from './routes';
import { ListScene, LoginScene } from '@/scenes';

export const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={switchRoutes.root} element={<LoginScene />} />
        <Route path={switchRoutes.login} element={<LoginScene />} />
        <Route path={switchRoutes.list} element={<ListScene />} />
      </Routes>
    </BrowserRouter>
  );
};
