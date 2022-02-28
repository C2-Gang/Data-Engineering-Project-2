import React from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class FormToxic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: null,
            baseURL: 'http://localhost:5000/toxic?piecetext=',
            globalToxicity: null,

            labels: null,
            dataset: null,
        }

        axios.defaults.withCredentials = true

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('Text: ' + this.state.value);
        event.preventDefault();
    }

    onClick = e => {
        axios.get(this.state.baseURL + this.state.value, { withCredentials: true }).then(res => {
                e.preventDefault()
                this.setState({ globalToxicity: res.data.toxicity })
                this.getTokicityLevels()
            }

        ).catch(error => {
            this.setState({ error: error.message });
            console.error('There was an error!', error);
        })
    }


    getTokicityLevels = () => {
        //const labels = ["Toxicity", "Identity Attack", "Insult", "Obscene", "Severe toxicity", "Threat"]
        const labels = ["toxicity", "identity_attack", "obscene", "severe_toxicity", "threat", "insult", ]
        const dataset = [this.state.globalToxicity.toxicity, this.state.globalToxicity.identity_attack,
            this.state.globalToxicity.obscene, this.state.globalToxicity.severe_toxicity,
            this.state.globalToxicity.threat, this.state.globalToxicity.insult ].map(Number)

        this.setState({ labels: labels })
        this.setState({ dataset: dataset })

    }

    renderToxicity = () => {
        if (this.state.labels && this.state.dataset){
            return (
                this.state.labels ?
                    <div>
                        <div className="title"> Results of Toxicity </div>
                            {this.state.labels.map(label =>
                                <div className="columns" key={label}>
                                    <div className="column"> {label} </div>
                                    <div className="column"> {this.state.globalToxicity[label]} </div>
                                </div>
                                )
                            }

                    </div>
                    : null
            )
        }
        else{
            return(<div>  </div>)
        }

    }

    getChart = () => {
        const data = {
            labels: this.state.labels,
            datasets: [{
                label: 'Toxicity',
                data: this.state.dataset,
                backgroundColor: '#023047',
                borderColor: '#000000',
                borderWidth: 1,
            }]
        };

        return (
            this.state.labels ?
            <div>
                <div className="title"> Bar of Toxicity </div>
                <Bar id="barChart" data={data} options={{
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}/>
            </div>
                : null
        )
    }

    render() {
        if (this.state.error) {
            return <h1>Caught an error.</h1>
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="title">Welcome to the toxicity application!</div>
                        <div className="subtitle">Let's enter a piece of text. We will tell you if it is toxic or not.
                        </div>
                        <div className="input">
                            <input id="piecetext" className="input" type="text" placeholder=" " value={this.state.value} onChange={this.handleChange} name="piecetext"/>
                            <label htmlFor="piecetext" className="placeholder">Your text</label>
                        </div>
                        <button type="submit" className="submit" value="submit" id="button" onClick={this.onClick}>Submit</button>
                    </div>
                </form>
                <div>
                    <div className="Experimentation">
                         {this.getChart()}

                        { this.renderToxicity()}

                    </div>
                </div>
            </div>

        );
    }
}
