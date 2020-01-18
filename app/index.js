import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Navigation from './components/Navigation'
import 'tachyons'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm'

class App extends React.Component{
    render(){
        return(
            <div>
                <Navigation />
                <Logo />
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