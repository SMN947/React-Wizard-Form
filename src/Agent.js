import React, { Component } from 'react';
import './style.css';

class StepperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        "lhwqtzib18ty31": {
          "title": "Que producto tiene el usuario",
          "options": {
            "99jwxw3wl73yg3": "Producto1",
            "bygycs21tpi9e2": "Producto2"
          }
        },
        "bygycs21tpi9e2": {
          "title": "Esta suspendido",
          "options": {
            "cz4yr4516na0q6": "si",
            "s4wwv6q2yoljlo": "no"
          }
        },
        "99jwxw3wl73yg3": {
          "title": "Esta suspendido",
          "options": {
            "x5ivrnz85utksv": "si",
            "ef6bl3hth2o3g7": "no"
          }
        },
        "x5ivrnz85utksv": {
          "transfer": "Producto1_Suspendido"
        },
        "ef6bl3hth2o3g7": {
          "transfer": "Producto1_NoSuspendido"
        },
        "cz4yr4516na0q6": {
          "transfer": "Producto2Suspendido"
        },
        "s4wwv6q2yoljlo": {
          "transfer": "Producto2_NoSuspendido"
        }
      },
      currentStep: 'lhwqtzib18ty31',
      selectedOption: '',
      selectionHistory: [],
    };
  }
  handleOptionChange = (event) => {
    this.state.formData[this.state.currentStep].transfer
    console.log(event.target.value)
    console.log(this.state.formData[event.target.value]);

    this.setState({ selectedOption: event.target.value });
    this.setState({ currentStep: event.target.value });

    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [...prevState.selectionHistory, event.target.value],
    }));
  };
  reset() {
    this.setState({ selectedOption: 'lhwqtzib18ty31' });
    this.setState({ currentStep: 'lhwqtzib18ty31' });
    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [],
    }));
  }

  render() {
    return (
      <>
        <div className="mid">
          <h2>Configuración</h2>
          <hr />
          <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>
        </div>
        <div className="mid">
          <h2>Formulario</h2>
          <hr />
          <h3>{this.state.selectionHistory.join(' > ')}</h3>
          <h1>{this.state.formData[this.state.currentStep].title}</h1>
          {this.state.formData[this.state.currentStep].options ? (
            <div>
              {Object.entries(
                this.state.formData[this.state.currentStep].options
              ).map(([key, value]) => (
                <div key={key}>
                  <input
                    type="radio"
                    id={key}
                    value={key}
                    checked={this.state.selectedOption === key}
                    onChange={this.handleOptionChange}
                  />
                  <label htmlFor={key}>{value}</label>
                </div>
              ))}
            </div>
          ) : this.state.formData[this.state.currentStep].transfer ? (
            <>
              <p>
                Transferir al skill:{' '}
                {this.state.formData[this.state.currentStep].transfer}
              </p>
              <button
                onClick={() => {
                  this.reset();
                }}
              >
                Reiniciar
              </button>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default StepperForm;
