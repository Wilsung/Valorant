import React from 'react'


class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://immense-garden-32810.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })
        })
        .then(response => {
            if(response.ok){
                this.setState({error: ''})
                return response.json()
            }else{
                this.setState({error: 'Username or password is incorrect.'})
            }
        })
        .then(user => {
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        .catch(error => console.log('Credentials invalid'))
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className=''>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l nw6 shadow-5 center">
                    <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        {this.state.error && <div className='mid-gray pt1 f6 i'>{this.state.error}</div>}
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
                                id="email-address" 
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      this.onSubmitSignIn()
                                    }
                                }}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      this.onSubmitSignIn()
                                    }
                                }}/>
                        </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db fl pointer">Register</p>
                            <p onClick={() => onRouteChange('skip')} className="f6 link dim black db fr pointer">Skip</p>
                        </div>
                    </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default SignIn;
