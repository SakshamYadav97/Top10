import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            err: []
        }
        console.log(this, 'yugyt67t7')
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (event) => {
        event.preventDefault();
        let { email, password, err } = this.state;
        //console.log('clicked')
        console.log(err)
        const user = {
            email: email,
            password: password
        }
        if (this.formValidation()) {
            axios.post('/api/users/login', user)
                .then(res => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            // console.log(err)
            // err.map((item, key) => {
            //     return (
            //         <p>{item}</p>
            //     )
            // })
        }
    }

    formValidation = () => {
        let { email, password, err } = this.state;
        if (email === '' || password === '') {
            err.push('Enter valid email and password')
            //console.log(err)
            this.setState({ err })
            return false
        } else {
            return true
        }
    }

    // let {email,password,err}=this.state;

    render() {
        let { email, password, err } = this.state;
        return (
            <div>

                <div>
                    <input
                        type='text'
                        value={this.state.email}
                        onChange={(e) => { this.handleChange(e) }}
                        name='email'
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={this.state.password}
                        onChange={(e) => { this.handleChange(e) }}
                        name='password'
                    />
                </div>
                {err.map((item, key) => {
                    return (
                        <p>{item}</p>
                    )
                })}
                <button onClick={(e) => { this.loginHandler(e) }}>Login</button>
            </div>
        );
    }
}

export default Login;