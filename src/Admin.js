import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { DynamicRect } from './DynamicRect';

const Admin = () => {
  const generateRandomId = () => {
    return (
      Math.random().toString(36).slice(2, 9) +
      Math.random().toString(36).slice(2, 9)
    );
  };

  const [shapes, setShapes] = useState([
    {
      "x": 203.25,
      "y": 63,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Que producto tiene el usuario",
      "key": "lhwqtzib18ty31",
      "index": 0,
      "isDragging": false,
      "isDrawingLine": false,
      "options": [
        {
          "name": "Producto1",
          "target": "99jwxw3wl73yg3",
          "key": "k4gudv7xurlqjp",
          "x": {
            "global": 503.25,
            "local": 20
          },
          "y": {
            "global": 163,
            "local": 24
          },
          "isDrawingLine": false
        },
        {
          "name": "Producto2",
          "target": "bygycs21tpi9e2",
          "key": "sbq1ygv1vvat4g",
          "x": {
            "global": 503.25,
            "local": 20
          },
          "y": {
            "global": 183,
            "local": 44
          },
          "isDrawingLine": false
        }
      ]
    },
    {
      "x": 703.6323,
      "y": 228.5,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Esta suspendido",
      "key": "bygycs21tpi9e2",
      "index": 1,
      "isDragging": false,
      "isDrawingLine": false,
      "options": [
        {
          "name": "si",
          "target": "cz4yr4516na0q6",
          "key": "nsjcw7jmjvygr3",
          "x": {
            "global": 1003.6323,
            "local": 20
          },
          "y": {
            "global": 328.5,
            "local": 24
          },
          "isDrawingLine": false
        },
        {
          "name": "no",
          "target": "s4wwv6q2yoljlo",
          "key": "o1x1gnyg8i8yy3",
          "x": {
            "global": 1003.6323,
            "local": 20
          },
          "y": {
            "global": 348.5,
            "local": 44
          },
          "isDrawingLine": false
        }
      ]
    },
    {
      "x": -165.1496000000001,
      "y": 229.40270000000004,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Esta suspendido",
      "key": "99jwxw3wl73yg3",
      "index": 2,
      "isDragging": false,
      "isDrawingLine": false,
      "options": [
        {
          "name": "si",
          "target": "x5ivrnz85utksv",
          "key": "ng9efm5oxpsfu3",
          "x": {
            "global": 134.8503999999999,
            "local": 20
          },
          "y": {
            "global": 329.40270000000004,
            "local": 24
          },
          "isDrawingLine": false
        },
        {
          "name": "no",
          "target": "ef6bl3hth2o3g7",
          "key": "f02njdyekudxi1",
          "x": {
            "global": 134.8503999999999,
            "local": 20
          },
          "y": {
            "global": 349.40270000000004,
            "local": 44
          },
          "isDrawingLine": false
        }
      ]
    },
    {
      "x": -249.8533000000001,
      "y": 485.86580000000015,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Producto1_Suspendido",
      "key": "x5ivrnz85utksv",
      "index": 3,
      "isDragging": false,
      "isDrawingLine": false,
      "options": []
    },
    {
      "x": 81.03330000000003,
      "y": 474.15300000000013,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Producto1_NoSuspendido",
      "key": "ef6bl3hth2o3g7",
      "index": 4,
      "isDragging": false,
      "isDrawingLine": false,
      "options": []
    },
    {
      "x": 405.26430000000005,
      "y": 495.96670000000006,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Producto2Suspendido",
      "key": "cz4yr4516na0q6",
      "index": 5,
      "isDragging": false,
      "isDrawingLine": false,
      "options": []
    },
    {
      "x": 765.8461,
      "y": 519.9177000000001,
      "width": 300,
      "height": 64,
      "id": "Nuevo",
      "title": "Producto2_NoSuspendido",
      "key": "s4wwv6q2yoljlo",
      "index": 6,
      "isDragging": false,
      "isDrawingLine": false,
      "options": []
    }
  ]);

  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(0);
  const [editingShape, setEditingShape] = useState(null);
  const [editPopUpOption, setEditPopUpOption] = useState(0);
  const [editingOption, setEditingOption] = useState(null);
  const [lineShapes, setLineShapes] = useState([
    {
      "start": "k4gudv7xurlqjp",
      "end": "99jwxw3wl73yg3"
    },
    {
      "start": "sbq1ygv1vvat4g",
      "end": "bygycs21tpi9e2"
    },
    {
      "start": "nsjcw7jmjvygr3",
      "end": "cz4yr4516na0q6"
    },
    {
      "start": "o1x1gnyg8i8yy3",
      "end": "s4wwv6q2yoljlo"
    },
    {
      "start": "ng9efm5oxpsfu3",
      "end": "x5ivrnz85utksv"
    },
    {
      "start": "f02njdyekudxi1",
      "end": "ef6bl3hth2o3g7"
    }
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [scale, setScale] = useState(1);
  const [isRemovinOption, setIsRemovingOption] = useState(false);

  const parseShapesToFlow = (json) => {
    const result = {};

    const producto = json[0];
    result.producto = {
      title: producto.title,
      options: {},
    };

    for (const option of producto.options) {
      result.producto.options[option.name] = option.name;
    }

    for (let i = 1; i < json.length; i++) {
      const node = json[i];

      if (node.options.length > 0) {
        const options = {};
        for (const option of node.options) {
          options[option.name] = option.title;
        }
        result[node.key] = {
          title: node.title,
          options: options,
        };
      } else {
        result[node.key] = {
          transfer: node.title,
        };
      }
    }

    return result;
  }


  const addShape = () => {
    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    const scale = stage.scaleX(); // Get the current scale factor of the stage
    const x = ((pointerPos.x - stage.x()) / scale); // Adjust the x coordinate of the new shape based on the current position and scale factor of the stage
    const y = ((pointerPos.y - stage.y()) / scale); // Adjust the y coordinate of the new shape based on the current position and scale factor of the stage
    setShapes([
      ...shapes,
      {
        x,
        y,
        width: 100,
        height: 50,
        id: 'Nuevo',
        title: 'nuevo',
        key: generateRandomId(),
      },
    ]);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault(); // Prevent the default zoom behavior of the browser

    const scaleBy = 1.1; // Set the amount of scaling for each mouse scroll
    const oldScale = stageRef.current.scaleX();
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy; // Determine the new scale factor

    // Set the new scale factor within the limits of the minimum and maximum values
    const MIN_SCALE = 0.05;
    const MAX_SCALE = 1.5;
    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      setScale(newScale);

      // Adjust the position of the stage to zoom in/out around the mouse position
      const pointerPos = stageRef.current.getPointerPosition();
      const mousePointTo = {
        x: (pointerPos.x - stageRef.current.x()) / oldScale,
        y: (pointerPos.y - stageRef.current.y()) / oldScale,
      };
      const newPos = {
        x: pointerPos.x - mousePointTo.x * newScale,
        y: pointerPos.y - mousePointTo.y * newScale,
      };
      stageRef.current.position(newPos);
    }
  };


  const closePopUp = () => {
    setEditPopUp(false);
  };

  const closePopUpOption = () => {
    setEditPopUpOption(false);
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
        if (item.options) {
          acc.push(...item.options);
        }
        return acc;
      }, [])
      : null;

  const updateShape = (index, newShape) => {
    if (isRemovinOption) {
      setIsRemovingOption(false);
      return;
    } else {
      setShapes((prevShapes) => {
        const updatedShapes = [...prevShapes];
        updatedShapes[index] = newShape;
        return updatedShapes;
      });
    }
  };

  const handleClickEdit = (shape, index) => {
    shape.index = index;
    setEditPopUp(true);
    setEditingShape(shape);
  };

  const handleClickAddOption = (shape, index) => {
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
  const saveOptionInformation = () => {
    let newShapes = [...shapes];
    let optionToUpdate = newShapes.find((obj) =>
      obj.options.find((option) => option.key === editingOption.key)
    );
    let updatedShapes = newShapes.map((obj) => {
      if (obj.id === optionToUpdate?.id) {
        let updatedOptions = obj.options?.map((option) => {
          if (option.key === editingOption.key) {
            return { ...option, ...editingOption };
          }
          return option;
        });
        return { ...obj, options: updatedOptions };
      }
      return obj;
    });
    setEditPopUpOption(false);
    setEditingOption(null);
    setShapes(updatedShapes);
  };

  const handleOptionLine = (shapeSelected, type) => {
    if (selectedOptions.length == 0 && type == 'option') {
      setSelectedOptions([shapeSelected]);
    } else if (selectedOptions.length == 1 && type == "card") {

      console.log(shapeSelected)

      let lineShape = {
        start: selectedOptions[0].key,
        end: shapeSelected.key,
      };

      let targetKey = selectedOptions[0].key;
      let targetValue = shapeSelected.key;

      const updatedShapes = shapes.map((item) => {
        const options = item.options || [];

        const updatedOptions = options.map((option) => {
          if (option.key === targetKey) {
            return { ...option, target: targetValue };
          }
          return option;
        });

        return { ...item, options: updatedOptions };
      });

      // Update the state with the new copy
      setShapes(updatedShapes);
      setLineShapes([...lineShapes, lineShape]);
      setSelectedOptions([]);
    }
  };

  const getLineCoordinates = (line) => {
    let lineStart = getOptionByKey(line.start);
    let lineEnd = getOptionByKey(line.end);
    let startX = lineStart.x.global;
    let startY = lineStart.y.global;
    let endX = lineEnd.x;
    let endY = lineEnd.y;

    let coords = [
      (startX > endX + 300) ? startX - 300 : startX,
      startY + 25,
      endX + 150,
      endY,
    ];
    return coords;
  };

  const getOptionByKey = (key) => {
    let thisOption = null
    shapes.map((item) => {
      if (item.key == key) {
        thisOption = item;
      }
      const options = item.options || [];
      return options.filter((option) => {
        if (option.key === key) {
          thisOption = option;
          return option;
        }
      });
    });

    return thisOption;
  };

  const handleClickEditOption = (option, index) => {
    setEditingOption(option)
    setEditPopUpOption(true)
  };

  // a method to remove a shape from shapes and remove any lines connected to it
  const handleClickRemoveShape = (shapeKey, index) => {
    let linesToRemove = [shapeKey.key]
    shapeKey.options?.map((option) => {
      linesToRemove.push(option.key)
    })
    console.log(linesToRemove)
    console.log(lineShapes)
    console.log(lineShapes.filter((line) => !linesToRemove.includes(line.start) && !linesToRemove.includes(line.end)))
    setLineShapes(lineShapes.filter((line) => !linesToRemove.includes(line.start) && !linesToRemove.includes(line.end)));
    shapeKey = shapeKey.key
    setIsRemovingOption(true);
    const newShapes = [...shapes];
    const shapeToRemove = newShapes.find((obj) => obj.key === shapeKey);
    console.log(shapeToRemove)
    if (shapeToRemove) {
      const updatedShapes = newShapes.filter((obj) => obj.key !== shapeKey);

      setTimeout(() => {
        setShapes(updatedShapes);
      }, 500);
    }
  };

  const handleClickRemoveOption = (optionKey, index) => {
    setIsRemovingOption(true);
    optionKey = optionKey.key
    console.log(optionKey)
    const newShapes = [...shapes];
    const optionToRemove = newShapes.find((obj) =>
      obj.options?.find((option) => option.key === optionKey)
    );
    console.log(optionToRemove)
    console.log(lineShapes)
    if (optionToRemove) {
      const updatedOptions = optionToRemove.options.filter((option) => option.key !== optionKey);
      console.log(updatedOptions)
      const updatedShapes = newShapes.map((obj) => {
        if (obj.key === optionToRemove.key) {
          return { ...obj, options: updatedOptions };
        }
        return obj;
      });

      setLineShapes(lineShapes.filter((line) => line.start !== optionKey && line.end !== optionKey));
      setShapes(updatedShapes);
    }
  };

  return (
    <>
      <div className="mid2">
        <div className="mid">
          <h4>Codigo del editor</h4>
          <hr />
          <pre>{JSON.stringify(shapes, null, 1)}</pre>
        </div>

        <div className="mid">
          <h4>Codigo para guardar y mostrar al asesor</h4>
          <hr />
          <pre>{JSON.stringify(parseShapesToFlow(shapes), null, 1)}</pre>
        </div>
      </div>
      <div className="mid1">
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
          onWheel={handleWheel}
          draggable={true}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>

            {shapes != null
              ? shapes.map((shape, i) => (
                <DynamicRect
                  key={shape.key}
                  shape={shape}
                  index={i}
                  onUpdate={(newShape) => updateShape(i, newShape)}
                  editFields={() => handleClickEdit(shape, i)}
                  addOption={(newShape) => handleClickAddOption(newShape, i)}
                  isDrawingLine={isDrawingLine}
                  optionLineAdd={(selectedOption, type) =>
                    handleOptionLine(selectedOption, type)
                  }
                  editOption={(option, index) => handleClickEditOption(option, index)}
                  removeOption={(option, index) => handleClickRemoveOption(option, index)}
                  removeCard={(card, index) => handleClickRemoveShape(card, index)}
                />
              )) : null}

            {lineShapes.map((el, i) => {
              let points = getLineCoordinates(el)
              return (
                <Group key={"lineMarker" + i}>
                  <Line
                    key={i}
                    points={points}
                    stroke="#000000"
                  />
                  <Rect
                    fill="#C0FF00"
                    width={10}
                    height={10}
                    x={points[0] - 5}
                    y={points[1] - 5}
                  />
                  <Rect
                    fill="#FF0000"
                    width={10}
                    height={10}
                    x={points[2] - 5}
                    y={points[3] - 5}
                  />
                </Group>
              );
            })}
          </Layer>
          <Layer id="grid-layer" />
        </Stage>
      </div>
      {
        editPopUp ? (
          <div className="edit">
            <h4> Editando</h4>
            <hr />
            <div>
              <label htmlFor="title">Título</label>
              <br />
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
        ) : null
      }

      {/* PopUp Edit Option */}
      {
        editPopUpOption ? (
          <div className="edit">
            <h4> Editando Opcion</h4>
            <hr />
            <div>
              <label htmlFor="name">Título</label>
              <hr />
              <input
                type="text"
                name="name"
                id="name"
                value={editingOption.name}
                onChange={(event) =>
                  setEditingOption({ ...editingOption, name: event.target.value })
                }
              />
              <hr />
              <button onClick={() => saveOptionInformation()}>Guardar</button>
            </div>
            <div className="close" onClick={() => closePopUpOption()}>
              X
            </div>
          </div>
        ) : null
      }
    </>
  );
};

export default Admin;
