import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Navigation from './components/Navigation'
import 'tachyons'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const app = new Clarifai.App({
    apiKey: 'a53834df9d2f4a72b81facff2adf9870'
})

const particleOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
}

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    calculateFaceLocation = (data) => {
        const face_location = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: face_location.left_col * width,
            topRow: face_location.top_row * height,
            rightCol: width - (face_location.right_col * width),
            bottomRow: height - (face_location.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState ({box})
    }

    onSubmit = () => {
        this.setState({
            imageUrl: this.state.input
        })
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL, 
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout'){
            this.setState({isSignedIn: false})   
        }else if (route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route})
    }

    render(){
        const { isSignedIn, imageUrl, box, route } = this.state;
        return(
            <div>
                <Particles 
                    className='particles'
                    params={particleOptions} 
                />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                {route === 'home' ? 
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onSubmit={this.onSubmit}
                        />
                    </div>
                    : (
                        route === 'signin' ?
                            <SignIn onRouteChange={this.onRouteChange}/> 
                            : <Register onRouteChange={this.onRouteChange}/>   
                    )
                }
                
                <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)