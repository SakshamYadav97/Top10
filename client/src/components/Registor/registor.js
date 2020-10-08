import React, { Component } from 'react';
import axios from 'axios';
import './registor.scss';

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
            <div className='register-wrapper'>
                <div className='section-wrapper'>
                    <div className='section'>
                        <h4 className='register-text'>Sign Up</h4>
                    </div>
                    <div className='section email-wrapper'>
                        <input
                            type='text'
                            value={this.state.name}
                            onChange={(e) => { this.handleChange(e) }}
                            name='name'
                            className='input'
                            placeholder='Name'
                        />
                    </div>
                    <div className='section email-wrapper'>
                        <input
                            type='text'
                            value={this.state.lastname}
                            onChange={(e) => { this.handleChange(e) }}
                            name='lastname'
                            className='input'
                            placeholder='Last Name'
                        />
                    </div>
                    <div className='section email-wrapper'>
                        <input
                            type='text'
                            value={this.state.email}
                            onChange={(e) => { this.handleChange(e) }}
                            name='email'
                            className='input'
                            placeholder='Email'
                        />
                    </div>
                    <div className='section email-wrapper'>
                        <input
                            type='password'
                            value={this.state.password}
                            onChange={(e) => { this.handleChange(e) }}
                            name='password'
                            className='input'
                            placeholder='Password'
                        />
                    </div>
                    <button onClick={(e) => { this.loginHandler(e) }}>Sign Up</button>
                </div>
            </div>
        );
    }
}

export default Registor;