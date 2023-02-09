import React, { Component } from 'react';
import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import './style.css';

class DynamicRect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.shape,
      isDragging: false,
    };
  }

  componentDidMount() {
    let tempText = new window.Konva.Text({
      text: this.state.text,
      fontSize: 14,
      fontFamily: 'Calibri',
    });

    this.setState({
      width: tempText.width() + 20,
      height: tempText.height() + 20,
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
        onClick={() => this.handleClick(this.state)}
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
          fill="#00D2FF"
          width={this.state.width}
          height={this.state.height}
        />
        <Text
          x={10}
          y={10}
          text={this.state.text}
          fontSize={14}
          fontFamily="Calibri"
        />
      </Group>
    );
  }
}

export { DynamicRect };
