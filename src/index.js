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
        <Route path="/weather/results" element={<Result />} />
        <Route path="/weather" element={<Search />} />
        <Route path="*" element={<Navigate replace to="/weather" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);