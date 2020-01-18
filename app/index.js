import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Navigation from './components/Navigation'
import 'tachyons'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';

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
    render(){
        return(
            <div>
                <Particles 
                    className='particles'
                    params={particleOptions} 
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm />
                {/* <FaceRecognition /> */}
            </div>
            
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)