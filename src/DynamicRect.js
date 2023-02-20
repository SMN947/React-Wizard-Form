import React, { Component } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import './style.css';

class DynamicRect extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      ...this.props.shape,
      index: this.props.index,
      isDragging: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shape !== this.props.shape) {
      this.setState({
        ...this.props.shape,
        index: this.props.index,
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
      width: 150,
      height: tempText.height() + 50,
    });

    if (this.state.options != undefined) {
      this.setState({
        options: this.state.options.map((option, index) => {
          return {
            ...option,
            x: {
              global: this.state.x + 150,
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

    console.table(this.state.options);
  };

  handleClick = (e) => {
    console.table(e);
    console.log(this.state);
  };

  handleUpdate = () => {
    console.log('Actualizando shapes');
    this.props.onUpdate(this.state);
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

  optionLineAdd = (data) => {
    this.props.optionLineAdd(data);
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
          // onClick={() => this.handleClick(this.state)}
          onDragStart={() => {
            console.log('dragging');
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
          {/* EDIT CARD */}
          <Group x={0} y={0} onClick={() => this.handleClickEdit(this.state)}>
            <Rect x={0} y={0} fill="#ffD2FF" width={150} height={20} />

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
            <Rect x={0} y={0} fill="#ffD2FF" width={150} height={20} />

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
              // width={this.state.width}
              width={150}
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
              width={150}
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
                    <Group x={key.x.local} y={key.y.local}>
                      <Text
                        x={0}
                        y={0}
                        key={key.key + 'point'}
                        text={'🔘'}
                        fontSize={14}
                        fontFamily="Calibri"
                        onClick={() => this.optionLineAdd(key)}
                      />
                      <Text
                        x={20}
                        y={0}
                        key={key.key}
                        text={key.name}
                        fontSize={14}
                        fontFamily="Calibri"
                      />
                      <Text
                        x={80}
                        y={0}
                        key={key.key + 'coors'}
                        text={
                          key.x.global.toFixed(2) +
                          '-' +
                          key.y.global.toFixed(2)
                        }
                        fontSize={14}
                        fontFamily="Calibri"
                      />
                    </Group>
                  );
                })
              : null}
          </Group>

          {/* DEBUG */}
          <Group
            x={3}
            y={
              80 +
              (this.state.options != undefined
                ? this.state.options.length * 20 + 20
                : 20)
            }
          >
            <Text
              text={JSON.stringify(this.state, null, 2)}
              fontSize={14}
              fontFamily="Calibri"
            />
          </Group>
        </Group>
      </>
    );
  }
}

export { DynamicRect };
