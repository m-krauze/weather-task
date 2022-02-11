import React from 'react';
import { AppProvider } from './AppProvider';

export function App() {
  return (
    <AppProvider>
      <div>
        <header>
          Weather Task
        </header>
      </div>
    </AppProvider>
  );
}
