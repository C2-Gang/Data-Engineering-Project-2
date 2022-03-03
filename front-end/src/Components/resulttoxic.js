import React from 'react';
import axios from 'axios';

export default class ResultToxic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: null,

            labels: ["toxicity", "identity_attack", "obscene", "severe_toxicity", "threat", "insult", ],
            dataset: [this.props.toxicity.toxicity, this.props.toxicity.identity_attack,
                this.props.toxicity.obscene, this.props.toxicity.severe_toxicity,
                this.props.toxicity.threat, this.props.toxicity.insult ].map(Number),
        }

        axios.defaults.withCredentials = true

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
                                <div className="column"> {this.props.toxicity[label]} </div>
                            </div>
                        )
                        }
                        <div className="title"> Global Toxicity </div>
                        <h1> {this.props.toxicity.global_t} % </h1>

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

                </div>
                : null
        )
    }
    /*
     <Bar id="barChart" data={data} options={{
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}/>
     */

    render() {
        if (this.state.error) {
            return <h1>Caught an error.</h1>
        }
        return (
            <div>
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
