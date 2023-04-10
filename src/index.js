import React from 'react';
import { createRoot } from 'react-dom/client';
import ScoreBoard from './ScoreBoard';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
      <ScoreBoard />
);

