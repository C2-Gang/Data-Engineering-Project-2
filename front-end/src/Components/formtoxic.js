import React, {Component} from 'react';
import axios from 'axios';
import ResultToxic from "./resulttoxic";


export default class FormToxic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: null,
            baseURL: 'http://localhost:5000/toxic?piecetext=',
            globalToxicity: "",
        }

        axios.defaults.withCredentials = true

        this.source = axios.CancelToken.source();
        this.CancelToken = axios.CancelToken;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("go there")
        this.getToxicity()
    }

    handleChange = (event) => {
         event.persist();

        this.setState({value: event.target.value});
    }


    getToxicity = () => {
        axios.get(this.state.baseURL + this.state.value,
            { withCredentials: true,  cancelToken: this.source.token }).then(res => {
                if (this.mounted){
                    this.setState({ globalToxicity: res.data.toxicity })
                }
            }
        ).catch(error => {
            //this.setState({error: error})
            console.log(error)
        })
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        this.source.cancel("Component unmounted, request is cancelled.");
    }

    render() {
        if (this.state.error) {
            return <h1>Caught an error.</h1>
        }

        return (
            <div>
                <form data-testid="formGlobal" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form">
                        <div className="title">Welcome to the toxicity application!</div>
                        <div className="subtitle">Let's enter a piece of text. We will tell you if it is toxic or not.
                        </div>
                        <div className="input">
                            <input id="piecetext" className="input" type="text" placeholder=" " value={this.state.value} onChange={this.handleChange} name="piecetext"/>
                            <label htmlFor="piecetext" className="placeholder">Your text</label>
                        </div>
                        <button type="submit" className="submit" value="Submit">Submit</button>
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
