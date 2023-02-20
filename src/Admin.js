import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { DynamicRect } from './DynamicRect';

const Admin = () => {
  // console.clear();
  const generateRandomId = () => {
    return (
      Math.random().toString(36).slice(2, 9) +
      Math.random().toString(36).slice(2, 9)
    );
  };

  const [shapes, setShapes] = useState([
    {
      x: 39.9999223349016,
      y: 246.00241828858583,
      width: 150,
      height: 64,
      id: 'Nuevo',
      title: 'nuevo',
      key: 'blyc9ljyg4o641',
      index: 0,
      isDragging: false,
      options: [
        {
          name: 'Opción 1',
          target: '0anzko45m5vghw',
          key: 'nnnf0uvcez8cuj',
          x: {
            global: 49.9999223349016,
            local: 20,
          },
          y: {
            global: 346.00241828858583,
            local: 24,
          },
        },
        {
          name: 'Opción 2',
          target: 'none',
          key: 'b2au3j8vei6zhs',
          x: {
            global: 0,
            local: 0,
          },
          y: {
            global: 0,
            local: 0,
          },
        },
      ],
    },
    {
      x: 366.00245421710974,
      y: 234.002270230101,
      width: 150,
      height: 64,
      id: 'Nuevo',
      title: 'nuevo',
      key: '0anzko45m5vghw',
      index: 1,
      isDragging: false,
      options: [
        {
          name: 'Opción 3',
          target: 'none',
          key: 'miudu5548qmd8y',
          x: {
            global: 0,
            local: 0,
          },
          y: {
            global: 0,
            local: 0,
          },
        },
      ],
    },
  ]);
  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(0);
  const [editingShape, setEditingShape] = useState(null);
  const [lineShapes, setLineShapes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addShape = () => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setShapes([
      ...shapes,
      {
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        id: 'Nuevo',
        title: 'nuevo',
        key: generateRandomId(),
      },
    ]);
  };

  const closePopUp = () => {
    setEditPopUp(false);
  };

  const flowchart =
    shapes != null
      ? shapes.reduce((acc, shape, i) => {
          acc[`element${i + 1}`] = {
            title: shape.title,
            options: {},
          };
          return acc;
        }, {})
      : null;

  const optionsList =
    shapes != null
      ? shapes.reduce((acc, item) => {
          console.log('=================');
          if (item.options) {
            acc.push(...item.options);
          }
          return acc;
        }, [])
      : null;

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

  const fingTargetByKey = (key) => {
    for (let i = 0; i < optionsList.length; i++) {
      if (optionsList[i].key === key) {
        console.log('SI key', key, optionsList[i]);
        return optionsList[i];
      } else {
        console.log('NO key', key, optionsList[i]);
      }
    }
    return null;
  };

  const handleClickAddOption = (shape, index) => {
    console.log('Adding Option');
    console.log(shape, index);
    const newShapes = [...shapes];
    newShapes[index] = shape;
    setShapes(newShapes);
  };

  const saveShapeInformation = () => {
    const newShapes = [...shapes];
    newShapes[editingShape.index] = editingShape;
    setShapes(newShapes);
    closePopUp();
  };

  const handleOptionLine = (shapeSelected) => {
    console.log(selectedOptions);
    // setSelectedOptions
    console.log(shapeSelected);
    if (selectedOptions.length == 0) {
      setSelectedOptions(shapeSelected);
    } else {
      // setSelectedOptions({ ...selectedOptions, shapeSelected });
      setSelectedOptions([]);

      let lineShape = {
        start: {
          x: selectedOptions.x.global,
          y: selectedOptions.y.global,
        },
        end: {
          x: shapeSelected.x.global,
          y: shapeSelected.y.global,
        },
      };

      setLineShapes([...lineShapes, lineShape]);

      // setLineShapes(...lineShapes, [
      //   {
      //     start: {
      //       x: selectedOptions.x.global,
      //       y: selectedOptions.y.global,
      //     },
      //     end: {
      //       x: shapeSelected.x.global,
      //       y: shapeSelected.y.global,
      //     },
      //   },
      // ]);
    }

    console.log(selectedOptions);
  };

  return (
    <>
      <div className="mid">
        <div className="mid">
          <h4>Codigo del editor</h4>
          <hr />
          <pre>{JSON.stringify(shapes, null, 1)}</pre>
        </div>

        <div className="mid">
          <h4>Codigo para guardar y mostrar al asesor</h4>
          <hr />
          <pre>{JSON.stringify(lineShapes, null, 1)}</pre>
          {/* <pre>{JSON.stringify(optionsList, null, 1)}</pre> */}
          {/* <pre>{JSON.stringify(fingTargetByKey("d2zfggxtk3h88v"), null, 1)}</pre> */}
        </div>
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

            {shapes != null
              ? shapes.map((shape, i) => (
                  <DynamicRect
                    key={shape.key}
                    shape={shape}
                    index={i}
                    onUpdate={(newShape) => updateShape(i, newShape)}
                    editFields={() => handleClickEdit(shape, i)}
                    addOption={(newShape) => handleClickAddOption(newShape, i)}
                    optionLineAdd={(selectedOption) =>
                      handleOptionLine(selectedOption)
                    }
                  />
                ))
              : null}

            {lineShapes.map((el, i) => {
              return (
                <Line
                  key={i}
                  points={[el.start.x, el.start.y, el.end.x, el.end.y]}
                  stroke="#000000"
                />
              );
            })}

            {/* {
              optionsList.map((option, i) => {
                console.log(option.target, fingTargetByKey(option.key));
                if (option.target != "none") {
                  return (
                    <Line
                      key={i}
                      points={(option.x != undefined) ? [
                        option.x.global + 75,
                        option.y.global + 32,
                        fingTargetByKey(option.key).x.global,
                        fingTargetByKey(option.key).y.global
                      ] : [0, 0, 0, 0]}
                      stroke="#000000"
                    />
                  );
                }
              })
            } */}

            {/* {shapes.map((shape, i) => {
              if (shapes[i + 1]) {
                return (
                  <Line
                    key={i}
                    points={[
                      shape.x + shape.width / 2,
                      shape.y + shape.height / 2,
                      shapes[i + 1].x + shapes[i + 1].width / 2,
                      shapes[i + 1].y + shapes[i + 1].height / 2,
                    ]}
                    stroke="#ff0000"
                  />
                );
              }
              return null;
            })} */}
          </Layer>
          <Layer id="grid-layer" />
        </Stage>
      </div>
      {editPopUp ? (
        <div className="edit">
          <h4> Editando</h4>
          <hr />
          <div>
            <label htmlFor="title">Título</label>
            <br />
            {/* <input type="text" name="title" id="title" value={editingShape.title} onChange={(event) => setEditingShape({ ...editingShape, [event.target.name]: event.target.value })} /> */}
            <input
              type="text"
              name="title"
              id="title"
              value={editingShape.title}
              onChange={(event) =>
                setEditingShape({ ...editingShape, title: event.target.value })
              }
            />
            <label htmlFor="id">Id</label>
            <br />
            <input
              type="text"
              name="id"
              id="id"
              value={editingShape.id}
              onChange={(event) =>
                setEditingShape({ ...editingShape, id: event.target.value })
              }
            />
            <hr />
            <button onClick={() => saveShapeInformation()}>Guardar</button>
          </div>
          <div className="close" onClick={() => closePopUp()}>
            X
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Admin;
