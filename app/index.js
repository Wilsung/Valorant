import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends React.Component{
    constructor(){
        super();
        this.state = initialState;
    }
    render(){
        const { } = this.state;
        return(
            <div>
                <p>hello, world!</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)