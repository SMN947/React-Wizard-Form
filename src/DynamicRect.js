import React, { Component } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import './style.css';

class DynamicRect extends Component {
  constructor(props) {
    
    super(props);
    console.log(this.props)
    this.state = {
      ...this.props.shape,
      index: this.props.index,
      isDragging: false,
    };
  }

  componentDidMount() {
    console.log("-------")
    console.log(this.state)
    let tempText = new window.Konva.Text({
      text: this.state.text,
      fontSize: 14,
      fontFamily: 'Calibri',
    });

    this.setState({
      width: 150,//tempText.width() + 20,
      height: tempText.height() + 50,
    });
  }

  handleClick = (e) => {
    console.table(e);
    console.log(this.state);
  };


  handleUpdate = () => {
    console.log('Actualizando shapes');
    this.props.onUpdate(this.state);
  };

  handleClickAddOption = () => {
    this.props.editFields(this.state.index);
  };

  render() {
    return (
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
        <Rect
          x={0}
          y={0}
          fill="#CDCDCD"
          // width={this.state.width}
          width={150}
          height={this.state.height}
        />
        <Text
          x={10}
          y={25}
          text={"🖊 ID: " + this.state.text}
          fontSize={14}
          fontFamily="Calibri"
        />
        <Text
          x={10}
          y={45}
          text={"Titulo: " + this.state.text}
          fontSize={14}
          fontFamily="Calibri"
        />

        {/* ADD OPTION */}
        <Group
          x={0}
          y={0}
          onClick={() => this.handleClickAddOption(this.state)}
        >
          <Rect
            x={0}
            y={0}
            fill="#ffD2FF"
            width={150}
            height={20}
          />

          <Text
            x={3}
            y={3}
            text={"➕ Opcion"}
            fontSize={14}
            fontFamily="Calibri"
          />
        </Group>

        {/* EDIT ELEMENT */}
        <Group
          x={0}
          y={this.state.height}
          onClick={() => this.handleClickAddOption(this.state)}
        >
          <Rect
            x={0}
            y={0}
            fill="#ffD2FF"
            width={150}
            height={20}
          />

          <Text
            x={3}
            y={3}
            text={"✍ Editar"}
            fontSize={14}
            fontFamily="Calibri"
          />
        </Group>
      </Group>
    );
  }
}

export { DynamicRect };
