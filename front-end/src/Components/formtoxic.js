import React from 'react';
import axios from 'axios';
import ResultToxic from "./resulttoxic";

export default class FormToxic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: null,
            baseURL: 'http://localhost:5000/toxic?piecetext=',
            globalToxicity: null,
        }

        axios.defaults.withCredentials = true

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('Text: ' + event);
        event.preventDefault();
    }

    onClick = e => {
        axios.get(this.state.baseURL + this.state.value, { withCredentials: true }).then(res => {
                e.preventDefault()
                this.setState({ globalToxicity: res.data.toxicity })
            }

        ).catch(error => {
            this.setState({ error: error.message });
            console.error('There was an error!', error);
        })
    }

    render() {
        if (this.state.error) {
            return <h1>Caught an error.</h1>
        }
        return (
            <div>
                <form className="formGlobal" onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="title">Welcome to the toxicity application!</div>
                        <div className="subtitle">Let's enter a piece of text. We will tell you if it is toxic or not.
                        </div>
                        <div className="input">
                            <input id="piecetext" className="input" type="text" placeholder=" " value={this.state.value} onChange={this.handleChange} name="piecetext"/>
                            <label htmlFor="piecetext" className="placeholder">Your text</label>
                        </div>
                        <button type="button" className="submit" value="submit" id="button" onClick={this.onClick} role="button" >Submit</button>
                    </div>
                </form>
                { this.state.globalToxicity ?
                    <ResultToxic toxicity={this.state.globalToxicity}/>
                    : null
                }
            </div>

        );
    }
}
