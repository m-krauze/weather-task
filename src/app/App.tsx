import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <main>
      <div>
        <header>
          Weather Task
        </header>
        <Routes>
          <Route
            path="/"
            element={<>Home</>}
          />
          <Route
            path="/:city"
            element={<>City or city not found</>}
          />
          <Route
            path="*"
            element={<>404</>}
          />
        </Routes>
      </div>
    </main>
  );
}
