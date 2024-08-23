import React from 'react';
import { createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './index.css';
import Search from './Search.js';
import Result from './Result';

const root = createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Weather/*" element={<Result />} />
        <Route path="/" element={<Search />} />
        <Route path="*" element={<Navigate replace to="/Weather" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);