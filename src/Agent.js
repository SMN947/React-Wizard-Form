import React, { Component } from 'react';
import './style.css';

class StepperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        producto: {
          title: 'Que producto tiene el usuario',
          options: {
            Producto1: 'Producto1',
            Producto2: 'Producto2',
          },
        },
        Producto1: {
          title: 'Esta suspendido',
          options: {
            Si: 'Producto1Suspendido',
            No: 'Producto1NoSuspendido',
          },
        },
        Producto2: {
          title: 'Esta suspendido',
          options: {
            Si: 'Producto2Suspendido',
            No: 'Producto2NoSuspendido',
          },
        },
        Producto1Suspendido: {
          transfer: 'Producto1_Suspendido',
        },
        Producto1NoSuspendido: {
          transfer: 'Producto1_NoSuspendido',
        },
        Producto2Suspendido: {
          transfer: 'Producto2_Suspendido',
        },
        Producto2NoSuspendido: {
          transfer: 'Producto2_NoSuspendido',
        },
      },
      currentStep: 'producto',
      selectedOption: '',
      selectionHistory: [],
    };
  }
  handleOptionChange = (event) => {
    console.log(this.state.formData[event.target.value]);

    this.setState({ selectedOption: event.target.value });
    this.setState({ currentStep: event.target.value });

    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [...prevState.selectionHistory, event.target.value],
    }));
  };
  reset() {
    this.setState({ selectedOption: 'producto' });
    this.setState({ currentStep: 'producto' });
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
                    value={value}
                    checked={this.state.selectedOption === key}
                    onChange={this.handleOptionChange}
                  />
                  <label htmlFor={key}>{key}</label>
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
