import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Agent from './Agent';
import Admin from './Admin';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  if (localStorage.getItem('flowchart') == null) {

    localStorage.setItem('flowchartLines', '[{"start":"grhveffv3iw869","end":"lwd0run4r5hpvd"},{"start":"trnj85nz2s3gbn","end":"wq59eiuobjah2p"},{"start":"tw6dob58hwuey1","end":"ymu28gglgwwkjp"},{"start":"xw4osd9m80l2kj","end":"mxp2ttd5eesvhi"}]');
    localStorage.setItem('flowchart', '[{"x":197.81140000000002,"y":-70.24350000000001,"width":300,"height":64,"id":"Nuevo","title":"Que tipo de producto?","options":[{"name":"Pyme","target":"lwd0run4r5hpvd","key":"grhveffv3iw869","x":{"global":497.81140000000005,"local":20},"y":{"global":29.75649999999999,"local":24},"isDrawingLine":false},{"name":"Nube","target":"mxp2ttd5eesvhi","key":"xw4osd9m80l2kj","x":{"global":497.81140000000005,"local":20},"y":{"global":49.75649999999999,"local":44},"isDrawingLine":false}],"key":"tte3xgq8vi77xm","index":0,"isDragging":false,"isDrawingLine":false},{"x":71.81299999999999,"y":159.99999999999997,"width":300,"height":64,"id":"Nuevo","title":"Esta suspendido?","options":[{"name":"suspendido","target":"wq59eiuobjah2p","key":"trnj85nz2s3gbn","x":{"global":371.813,"local":20},"y":{"global":260,"local":24},"isDrawingLine":false},{"name":"No suspendido","target":"ymu28gglgwwkjp","key":"tw6dob58hwuey1","x":{"global":371.813,"local":20},"y":{"global":280,"local":44},"isDrawingLine":false}],"key":"lwd0run4r5hpvd","index":1,"isDragging":false,"isDrawingLine":false},{"x":402.92900000000003,"y":437.1679999999999,"width":300,"height":64,"id":"Nuevo","title":"test_skill_no_suspendido","options":[],"key":"ymu28gglgwwkjp","index":2,"isDragging":false,"isDrawingLine":false},{"x":-36.84400000000002,"y":378.66900000000004,"width":300,"height":64,"id":"Nuevo","title":"tes_skill_suspendido","options":[],"key":"wq59eiuobjah2p","index":3,"isDragging":false,"isDrawingLine":false},{"x":423.5,"y":133,"width":300,"height":64,"id":"Nuevo","title":"nuevo","options":[],"key":"mxp2ttd5eesvhi","index":4,"isDragging":false,"isDrawingLine":false}]');
  }
  console.clear()
  const [showAgent, setShowAgent] = useState(true);

  return (
    <StrictMode>
      <button onClick={() => setShowAgent(!showAgent)}>
        {showAgent ? 'Ver Admin' : 'Ver Agente'}
      </button>
      {' - '}
      {showAgent
        ? 'La derecha seria la visual del agente'
        : 'Aqui se crearian los arboles de configuracion'}
      <hr />
      {showAgent ? <Agent /> : <Admin />}
      {/* <Admin /> */}
      {/* <Agent /> */}
    </StrictMode>
  );
};

root.render(<App />);
