import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { DynamicRect } from './DynamicRect';

const Admin = () => {
  const generateRandomId = () => {
    return Math.random().toString(36).slice(2, 9) + Math.random().toString(36).slice(2, 9);
  };

  const [shapes, setShapes] = useState([
    {
      x: 430, y: 20, width: 0, height: 0, id: 'Producto', title: 'producto', key: generateRandomId()
    },
    { x: 178, y: 415, width: 0, height: 0, id: 'Producto1', title: 'End', key: generateRandomId() },
    {
      x: 25, y: 25, width: 0, height: 0, id: 'Producto2', title: 'End', key: generateRandomId(), "options": {
        "name": "Opción 1",
        "target": "test"
      }
    },
  ]);
  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(0);
  const [editingShape, setEditingShape] = useState(null);

  const addShape = () => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setShapes([
      ...shapes,
      { x: 50, y: 50, width: 100, height: 50, id: 'Nuevo', title: 'nuevo', key: generateRandomId() },
    ]);
  };


  const closePopUp = () => {
    setEditPopUp(false);
  };

  const flowchart = shapes.reduce((acc, shape, i) => {
    acc[`element${i + 1}`] = {
      title: shape.title,
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

  const handleClickEdit = (shape, index) => {
    shape.index = index;
    setEditPopUp(true);
    setEditingShape(shape);
  };


  const handleClickAddOption = (shape, index) => {
    console.log("Adding Option")
    console.log(shape, index)
  };

  const saveShapeInformation = () => {
    const newShapes = [...shapes];
    newShapes[editingShape.index] = editingShape;
    setShapes(newShapes);
    closePopUp()
  }

  return (
    <>
      <div className="mid">
        <pre className="mid">
          <h4>Codigo del editor</h4>
          <hr />
          {JSON.stringify(shapes, null, 1)}</pre>
        <pre className="mid">

          <h4>Codigo para guardar y mostrar al asesor</h4>
          <hr />
          {JSON.stringify(flowchart, null, 1)}</pre>
      </div>
      <div className="mid">
        <button
          onClick={() => {
            addShape();
          }}
        >
          Añadir Elemento
        </button>
        <hr />
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>

            {/* {shapes.map((shape, i) => {
              if (shapes[i + 1]) {
                return (
                  <Group>
                    <Line
                      key={i}
                      points={[
                        shape.x + shape.width / 2,
                        shape.y + shape.height / 2,
                        shapes[i + 1].x + shapes[i + 1].width / 2,
                        shapes[i + 1].y + shapes[i + 1].height / 2,
                      ]}
                      stroke="#000000"
                    />
                  </Group>
                );
              }
              return null;
            })} */}

            {shapes.map((shape, i) => (
              <DynamicRect
                key={shape.key}
                shape={shape}
                index={i}
                onUpdate={(newShape) => updateShape(i, newShape)}
                editFields={() => handleClickEdit(shape, i)}
                addOption={() => handleClickAddOption(shape, i)}
              />
            ))}

          </Layer>
        </Stage>
      </div>
      {
        editPopUp ?
          <div className='edit'>
            < h4 > Editando</h4 >
            <hr />
            <div>
              <label htmlFor="title">Título</label>
              <br />
              {/* <input type="text" name="title" id="title" value={editingShape.title} onChange={(event) => setEditingShape({ ...editingShape, [event.target.name]: event.target.value })} /> */}
              <input type="text" name="title" id="title" value={editingShape.title} onChange={(event) => setEditingShape({ ...editingShape, title: event.target.value })} />
              <label htmlFor="id">Id</label>
              <br />
              <input type="text" name="id" id="id" value={editingShape.id} onChange={(event) => setEditingShape({ ...editingShape, id: event.target.value })} />
              <hr />
              <button onClick={() => saveShapeInformation()}>Guardar</button>
            </div>
            <div className='close' onClick={() => closePopUp()}>
              X
            </div>
          </div > : null}
    </>
  );
};

export default Admin;
