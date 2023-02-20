import React, { Component } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import './style.css';

class DynamicRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.shape,
      index: this.props.index,
      isDragging: false,
      isDrawingLine: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shape !== this.props.shape) {
      this.setState({
        ...this.props.shape,
        index: this.props.index,
        isDrawingLine: this.props.isDrawingLine,

      });
      this.updateExtraFields();
    }
  }

  componentDidMount() {
    this.updateExtraFields();
  }

  updateExtraFields = () => {
    let tempText = new window.Konva.Text({
      text: this.state.title,
      fontSize: 14,
      fontFamily: 'Calibri',
    });

    this.setState({
      width: 300,
      height: tempText.height() + 50,
    });

    if (this.state.options != undefined) {
      this.setState({
        options: this.state.options.map((option, index) => {
          return {
            ...option,
            isDrawingLine: this.props.isDrawingLine,
            x: {
              global: this.state.x + 300,
              local: 20,
            },
            y: {
              global: this.state.y + 100 + index * 20,
              local: 24 + index * 20,
            },
          };
        }),
      });
    }
  };

  handleClick = (e) => {
    // console.table(e);
  };

  handleUpdate = () => {
    this.props.onUpdate(this.state);

    setTimeout(() => {
      this.props.onUpdate(this.state);
    }, 100);
  };

  handleClickEdit = () => {
    this.props.editFields(this.state.index);
  };

  generateRandomId = () => {
    return (
      Math.random().toString(36).slice(2, 9) +
      Math.random().toString(36).slice(2, 9)
    );
  };

  getSampleOption = () => {
    return {
      name: 'Opción 1',
      target: 'none',
      key: this.generateRandomId(),
      x: {
        global: 0,
        local: 0,
      },
      y: {
        global: 0,
        local: 0,
      },
    };
  };

  handleClickAddOption = () => {
    if (this.state.options == undefined) {
      this.setState({
        options: [this.getSampleOption()],
      });
    } else {
      this.setState({
        options: [...this.state.options, this.getSampleOption()],
      });
    }

    this.props.addOption(this.state);
  };

  optionLineAdd = (data, type) => {
    this.props.optionLineAdd(data, type);
    this.handleUpdate();
  };

  render() {
    return (
      <>
        <Group
          draggable
          x={this.state.x}
          y={this.state.y}
          scaleX={this.state.isDragging ? 1.2 : 1}
          scaleY={this.state.isDragging ? 1.2 : 1}
          shadowOffsetX={this.state.isDragging ? 10 : 5}
          shadowOffsetY={this.state.isDragging ? 10 : 5}
          onClick={() => { this.optionLineAdd(this.state, "card") }}
          onDragStart={() => {
            this.setState({
              isDragging: true,
            });
            this.handleUpdate();
          }}
          onDragEnd={(e) => {
            this.setState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            });
            this.handleUpdate();
          }}
        >
          {/* CONECT */}
          {this.state.isDrawingLine ? (<Group x={0} y={0} onClick={() => this.handleClickEdit(this.state)}>
            <Rect x={0} y={0} fill="#ffD2FF" width={300} height={20} />

            <Text
              x={3}
              y={3}
              text={'✍ Editar'}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group>) : null}


          {/* EDIT CARD */}
          <Group x={0} y={0} onClick={() => this.handleClickEdit(this.state)}>
            <Rect x={0} y={0} fill="#ffD2FF" width={300} height={20} />

            <Text
              x={3}
              y={3}
              text={'✍ Editar'}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group>

          {/* ADD OPTION */}
          <Group
            x={0}
            y={20}
            onClick={() => this.handleClickAddOption(this.state)}
          >
            <Rect x={0} y={0} fill="#ffD2FF" width={300} height={20} />

            <Text
              x={3}
              y={3}
              text={'➕ Añadir Opcion'}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group>

          {/* CONTENIDO DEL CARD */}
          <Group x={0} y={40}>
            <Rect
              fill="#CDCDCD"
              width={300}
              height={40}
            />
            <Text
              x={10}
              y={6}
              text={'ID: ' + this.state.id}
              fontSize={14}
              fontFamily="Calibri"
            />
            <Text
              x={10}
              y={25}
              text={'Titulo: ' + this.state.title}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group>

          {/* OPCIONES */}
          <Group x={0} y={80}>
            <Rect
              fill="#4acf3e"
              // width={this.state.width}
              width={300}
              height={
                this.state.options != undefined
                  ? this.state.options.length * 20 + 20
                  : 20
              }
            />
            <Text
              x={10}
              y={6}
              text={'Opciones'}
              fontSize={14}
              fontFamily="Calibri"
            />
            {this.state.options != undefined
              ? this.state.options.map((key, index) => {
                return (
                  <Group x={key.x.local} y={key.y.local} key={"Group" + key.key}>
                    <Text
                      x={0}
                      y={0}
                      key={key.key + 'point'}
                      text={'🔌'}
                      fontSize={14}
                      fontFamily="Calibri"
                      onClick={() => this.optionLineAdd(key, "option")}
                    />
                    <Text
                      x={20}
                      y={0}
                      key={key.key}
                      text={key.name}
                      fontSize={14}
                      fontFamily="Calibri"
                    />
                  </Group>
                );
              })
              : null}
          </Group>

          {/* DEBUG */}
          {/* <Group
            x={3}
            y={
              80 +
              (this.state.options != undefined
                ? this.state.options.length * 20 + 20
                : 20)
            }
            key={"Group" + this.state.id}
          >
            <Text
              text={JSON.stringify(this.state, null, 2)}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group> */}
        </Group>
      </>
    );
  }
}

export { DynamicRect };
