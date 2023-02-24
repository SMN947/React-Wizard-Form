import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Agent from './Agent';
import Admin from './Admin';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  console.clear()
  const [showAgent, setShowAgent] = useState(true);

  return (
    <StrictMode>
      {/* <button onClick={() => setShowAgent(!showAgent)}>
        {showAgent ? 'Ver Admin' : 'Ver Agente'}
      </button>
      {' - '}
      {showAgent
        ? 'La derecha seria la visual del agente'
        : 'Aqui se crearian los arboles de configuracion'}
      <hr />
      {showAgent ? <Agent /> : <Admin />} */}
      {/* <Admin /> */}
      <Agent />
    </StrictMode>
  );
};

root.render(<App />);
