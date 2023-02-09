import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { DynamicRect } from './DynamicRect';

const Admin = () => {
  const [shapes, setShapes] = useState([
    { x: 287, y: 20, width: 0, height: 0, id: 'Producto', text: 'producto' },
    { x: 178, y: 114, width: 0, height: 0, id: 'Producto1', text: 'End' },
    { x: 25, y: 25, width: 0, height: 0, id: 'Producto2', text: 'End' },
  ]);

  const stageRef = useRef(null);

  const addShape = () => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setShapes([
      ...shapes,
      { x: 50, y: 50, width: 100, height: 50, id: 'Nuevo', text: 'nuevo' },
      // { x: pos.x, y: pos.y, width: 100, height: 50, text: 'New Shape' },
    ]);
  };

  const flowchart = shapes.reduce((acc, shape, i) => {
    acc[`element${i + 1}`] = {
      title: shape.text,
      options: {},
    };
    return acc;
  }, {});

  const updateShape = (index, newShape) => {
    console.log('roger that', index, newShape);
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = newShape;
      return updatedShapes;
    });
  };
  return (
    <>
      <div className="mid">
        <h2>asd</h2>
        <hr />
        <button
          onClick={() => {
            addShape();
          }}
        >
          Añadir
        </button>
        <hr />
        <pre className="mid">{JSON.stringify(shapes, null, 1)}</pre>
        <pre className="mid">{JSON.stringify(flowchart, null, 1)}</pre>
      </div>
      <div className="mid">
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {shapes.map((shape, i) => (
              <DynamicRect
                key={shape.id}
                shape={shape}
                id={i}
                onUpdate={(newShape) => updateShape(i, newShape)}
              />
            ))}
            {shapes.map((shape, i) => {
              if (shapes[i + 1]) {
                return (
                  <Line
                    key={i}
                    points={[
                      shape.x + shape.width,
                      shape.y + shape.height / 2,
                      shapes[i + 1].x,
                      shapes[i + 1].y + shapes[i + 1].height / 2,
                    ]}
                    stroke="#000000"
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
      <div>Editor</div>
    </>
  );
};

export default Admin;
