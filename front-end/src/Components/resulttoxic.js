import React from 'react';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';

export default class ResultToxic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,

            labels: ["toxicity", "identity_attack", "obscene", "severe_toxicity", "threat", "insult", ],
            dataset: [this.props.toxicity.toxicity, this.props.toxicity.identity_attack,
                this.props.toxicity.obscene, this.props.toxicity.severe_toxicity,
                this.props.toxicity.threat, this.props.toxicity.insult ].map(Number),

            data: [
                    {type: "toxicity", value: Number(this.props.toxicity.toxicity)},
                    {type: "identity_attack", value: Number(this.props.toxicity.identity_attack)},
                    {type: "obscene", value: Number(this.props.toxicity.obscene)},
                    {type: "severe_toxicity", value: Number(this.props.toxicity.severe_toxicity)},
                    {type: "threat", value: Number(this.props.toxicity.threat)},
                    {type: "insult", value: Number(this.props.toxicity.insult)}
                ],
        }

        axios.defaults.withCredentials = true

    }

    globalToxicity = () => {
        return (
            this.state.labels ?
            <div>
                <div className="title"> Global Toxicity </div>

                <p className="global_toxic"> {this.props.toxicity.global_t *100} % </p>

            </div>
                : null
        )
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
                    </div>
                    : null
            )
        }
        else{
            return(<div>  </div>)
        }

    }

    getChart = () => {
        return (
            this.state.labels ?
                <div className="Experimentation">
                    <div className="title"> Bar of Toxicity </div>
                    <VictoryChart  theme={VictoryTheme.material} height={200} width={300} ticks={5}>
                        <VictoryBar
                            data={this.state.data.slice()}
                            x="type"
                            y="value"
                        />
                        <VictoryAxis
                            label="Toxic Chart"
                            style={{
                                axis: {stroke: "#756f6a"},
                                axisLabel: {fontSize: 10, padding: 30},
                                grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
                                ticks: {stroke: "grey", size: 5},
                                tickLabels: {fontSize: 7, padding: 5}
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x*100}%`)}
                            style={
                                {tickLabels: {fontSize: 7, padding: 5}}
                            }
                        />
                    </VictoryChart>
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
                <div>
                    <div className="Experimentation">
                        { this.globalToxicity()}
                        { this.renderToxicity()}
                        {this.getChart()}
                    </div>
                    <button className="submit" onClick={() => window.location.reload(false)}>Re Do </button>
                </div>
            </div>

        );
    }
}
