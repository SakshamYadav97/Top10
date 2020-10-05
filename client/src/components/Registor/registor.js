import React, { Component } from 'react';
import axios from 'axios';

class Registor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: ''
        }
        console.log(this, 'yugyt67t7')
    }

    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (event) => {
        event.preventDefault();
        console.log('clicked')
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/users/register', user)
            .then(res => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>

                <div>
                    <input
                        type='text'
                        value={this.state.name}
                        onChange={(e) => { this.handleChange(e) }}
                        name='name'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={this.state.lastname}
                        onChange={(e) => { this.handleChange(e) }}
                        name='lastname'
                    />
                </div>
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
                <button onClick={(e) => { this.loginHandler(e) }}>Sign Up</button>
            </div>
        );
    }
}

export default Registor;