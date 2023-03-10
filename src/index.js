import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Agent from './Agent';
import Admin from './Admin';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const App = () => {
  // if (localStorage.getItem('flowchart') == null) {
  localStorage.setItem(
    'flowchartLines',
    '[{"start":"vl7oyz1avlnt2w","end":"n7yc7kdj95rlgu"},{"start":"a6aznjn3ib69bs","end":"catp1rt2f5a9ql"},{"start":"ytaiwe4js9bhqs","end":"395x0d7bwtyc2h"},{"start":"pbmh4wfy5pid91","end":"aj630jab7nhug0"},{"start":"70vpdwvh80v6t6","end":"wdp8lu8lodul2j"},{"start":"jrlawm79pp95x8","end":"j0g6y6khlwhki4"},{"start":"ytti1c5yw31f1a","end":"4ovpsx23fphykh"}]'
  );
  localStorage.setItem(
    'flowchart',
    '[{"x":63.5,"y":-33,"width":300,"height":64,"id":"Nuevo","title":"ESTADO DEL CLIENTE","options":[{"name":"Activo","target":"n7yc7kdj95rlgu","key":"vl7oyz1avlnt2w","x":{"global":363.5,"local":20},"y":{"global":67,"local":24},"isDrawingLine":false},{"name":"Suspendido - Activo","target":"none","key":"qbz1mv49tr2zxy","x":{"global":363.5,"local":20},"y":{"global":87,"local":44},"isDrawingLine":false},{"name":"Suspendido - Inactivo","target":"none","key":"328hjpih3n1tf8","x":{"global":363.5,"local":20},"y":{"global":107,"local":64},"isDrawingLine":false}],"key":"cpr3oi5mjqzgar","index":0,"isDragging":false,"isDrawingLine":false},{"x":-89.75,"y":162,"width":300,"height":64,"id":"Nuevo","title":"PRODUCTO","options":[{"name":"Nube","target":"catp1rt2f5a9ql","key":"a6aznjn3ib69bs","x":{"global":210.25,"local":20},"y":{"global":262,"local":24},"isDrawingLine":false}],"key":"n7yc7kdj95rlgu","index":1,"isDragging":false,"isDrawingLine":false},{"x":-252.75,"y":351,"width":300,"height":64,"id":"Nuevo","title":"QUE DESEA EL CLIENTE","options":[{"name":"Soporte sobre el programa","target":"395x0d7bwtyc2h","key":"ytaiwe4js9bhqs","x":{"global":47.25,"local":20},"y":{"global":451,"local":24},"isDrawingLine":false},{"name":"Estado de cuenta","target":"4ovpsx23fphykh","key":"ytti1c5yw31f1a","x":{"global":47.25,"local":20},"y":{"global":471,"local":44},"isDrawingLine":false},{"name":"Comprar un producto","target":"none","key":"a167wqslajzv43","x":{"global":47.25,"local":20},"y":{"global":491,"local":64},"isDrawingLine":false},{"name":"Ya no va a renovar","target":"none","key":"1hrgtwh5cq03m2","x":{"global":47.25,"local":20},"y":{"global":511,"local":84},"isDrawingLine":false}],"key":"catp1rt2f5a9ql","index":2,"isDragging":false,"isDrawingLine":false},{"x":-424.33900000000017,"y":574.2279000000001,"width":300,"height":64,"id":"Nuevo","title":"QUE TIPO DE SOPORTE","options":[{"name":"FE Facturación electronica","target":"aj630jab7nhug0","key":"pbmh4wfy5pid91","x":{"global":-124.33900000000017,"local":20},"y":{"global":674.2279000000001,"local":24},"isDrawingLine":false},{"name":"Nomina electronica y no electronica","target":"wdp8lu8lodul2j","key":"70vpdwvh80v6t6","x":{"global":-124.33900000000017,"local":20},"y":{"global":694.2279000000001,"local":44},"isDrawingLine":false},{"name":"Todos los demás procesos","target":"j0g6y6khlwhki4","key":"jrlawm79pp95x8","x":{"global":-124.33900000000017,"local":20},"y":{"global":714.2279000000001,"local":64},"isDrawingLine":false}],"key":"395x0d7bwtyc2h","index":3,"isDragging":false,"isDrawingLine":false},{"x":-855.5997702479339,"y":625.8301859504134,"width":300,"height":64,"id":"Nuevo","title":"Col_Customer_NubeFe","options":[],"key":"aj630jab7nhug0","index":4,"isDragging":false,"isDrawingLine":false},{"x":-767.9964644628099,"y":974.5905165289254,"width":300,"height":64,"id":"Nuevo","title":"Col_Customer_Nube","options":[],"key":"j0g6y6khlwhki4","index":5,"isDragging":false,"isDrawingLine":false},{"x":-896.0956380165287,"y":825.830185950413,"width":300,"height":64,"id":"Nuevo","title":"Col_Customer_NubeNomina","options":[],"key":"wdp8lu8lodul2j","index":6,"isDragging":false,"isDrawingLine":false},{"x":-421.45283472118706,"y":745.4111759502629,"width":300,"height":64,"id":"Nuevo","title":"SU ULTIMA FACTURA ES UNA","options":[{"name":"F93 Facturacion por tienda","target":"none","key":"h4ufez0286zs2t","x":{"global":-121.45283472118706,"local":20},"y":{"global":845.4111759502629,"local":24},"isDrawingLine":false},{"name":"F94 Facturacion cliente nuevo","target":"none","key":"kius8xf8auz7uu","x":{"global":-121.45283472118706,"local":20},"y":{"global":865.4111759502629,"local":44},"isDrawingLine":false},{"name":"F95 Renovacion","target":"none","key":"enwj5zwp1hfrqz","x":{"global":-121.45283472118706,"local":20},"y":{"global":885.4111759502629,"local":64},"isDrawingLine":false}],"key":"4ovpsx23fphykh","index":7,"isDragging":false,"isDrawingLine":false}]'
  );
  // }
  console.clear();
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
