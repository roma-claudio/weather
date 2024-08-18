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
        <Route exact strict path="/Weather/*" element={<Result/>} />
        <Route exact path="/" element={<Search />}/>
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);