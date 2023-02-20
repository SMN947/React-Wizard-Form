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

  const [shapes, setShapes] = useState([]);
  const stageRef = useRef(null);
  const [editPopUp, setEditPopUp] = useState(0);
  const [editingShape, setEditingShape] = useState(null);
  const [lineShapes, setLineShapes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDrawingLine, setIsDrawingLine] = useState(false);
  const [scale, setScale] = useState(1);

  const addShape = () => {
    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    const scale = stage.scaleX(); // Get the current scale factor of the stage
    const x = ((pointerPos.x - stage.x()) / scale) + 100; // Adjust the x coordinate of the new shape based on the current position and scale factor of the stage
    const y = ((pointerPos.y - stage.y()) / scale) + 100; // Adjust the y coordinate of the new shape based on the current position and scale factor of the stage
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

  const handleOptionLine = (shapeSelected, type) => {
    console.log(shapeSelected, type, selectedOptions, selectedOptions.length)

    if (selectedOptions.length == 0 && type == 'option') {
      setSelectedOptions([shapeSelected]);
    } else if (selectedOptions.length == 1 && type == "card") {

      console.log(shapeSelected)

      let lineShape = {
        start: selectedOptions[0].key,
        end: shapeSelected.key,
      };

      let targetKey = selectedOptions.key;
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
      startY + 10,
      endX + 150,
      endY,
    ]
    console.clear()
    console.log([
      lineStart.x.global,
      lineStart.y.global,
      lineEnd.x,
      lineEnd.y,
    ])
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
          {/* <pre>{JSON.stringify(lineShapes, null, 1)}</pre> */}
          <pre>{JSON.stringify(optionsList, null, 1)}</pre>
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
      {editPopUp ? (
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
      ) : null}
    </>
  );
};

export default Admin;
