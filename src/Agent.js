import React, { Component } from 'react';
import './style.css';

class StepperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      currentStep: null,
      selectedOption: '',
      selectionHistory: [],
      loading: true,
    };
  }

  componentDidMount() {
    const storedData = localStorage.getItem('flowchart');
    if (storedData) {
      let JSONData = this.parseShapesToFlow(JSON.parse(storedData));
      this.setState({ formData: JSONData });
      this.setState({ currentStep: Object.keys(JSONData)[0] });
    }

    this.setState({ loading: false });

  }

  parseShapesToFlow = (json) => {
    console.log(json)
    const result = {};

    for (let i = 0; i < json.length; i++) {
      const node = json[i];

      if (node.options.length > 0) {
        const options = {};
        for (const option of node.options) {
          options[option.target] = option.name;
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

  handleOptionChange = (event) => {
    this.state.formData[this.state.currentStep].transfer
    console.log(event.target.value)
    console.log(this.state.formData[event.target.value]);

    this.setState({ selectedOption: event.target.value });
    this.setState({ currentStep: event.target.value });

    let selecedOPtionForBreadcrumb = this.state.formData[this.state.currentStep].options[event.target.value]
    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [...prevState.selectionHistory, selecedOPtionForBreadcrumb],
    }));
  };
  reset() {
    let firstStep = Object.keys(this.state.formData)[0];
    this.setState({ selectedOption: firstStep });
    this.setState({ currentStep: firstStep });
    this.setState((prevState) => ({
      ...prevState,
      selectionHistory: [],
    }));
  }

  render() {
    return (
      <>
        <div className="mid2">
          <h2>Configuración</h2>
          <hr />
          <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>
        </div>
        <div className="mid1">
          {
            (this.state.formData[this.state.currentStep] != undefined) ? <>
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
            </> : "NO existe un formulario"
          }
        </div>
      </>
    );
  }
}

export default StepperForm;
