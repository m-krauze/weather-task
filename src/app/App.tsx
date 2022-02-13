import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CloudIcon } from '@heroicons/react/solid';
import { getClassName } from '../utils/getClassName';
import { HomePage } from '../pages/HomePage';

export function App() {
  return (
    <main>
      <div>
        <header className={getClassName([
          'flex',
          'justify-center',
          'align-middle',
          'p-6',
          'items-center',
        ])}
        >
          <div className={getClassName([
            'flex',
            'items-center',
            'px-10',
            'rounded-3xl',
            'bg-gradient-to-r',
            'from-sky-300',
            'to-cyan-700',
          ])}
          >
            <h2 className={getClassName([
              'text-4xl',
              'font-mono',
              'font-bold',
              'text-yellow-300',
              'mr-5',
            ])}
            >
              Weather Task
            </h2>
            <CloudIcon className={getClassName([
              'w-20',
              'h-20',
              'fill-yellow-300',
            ])}
            />
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
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
