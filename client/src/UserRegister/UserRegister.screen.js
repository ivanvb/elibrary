import React, { Component } from 'react';

export class UserRegister extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: ""
        };

        this.submit = this.submit.bind(this);
        this.handleChange =  this.handleChange.bind(this);
    }

    async submit(e){
        e.preventDefault();
        let ans = await fetch("/user/signup/", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        });

        let res = await ans.json();
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input onChange={this.handleChange} name="name" value={this.state.name}/>
                <input onChange={this.handleChange} name="email" value={this.state.email}/>
                <input type="password" onChange={this.handleChange} name="password" value={this.state.password}/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default UserRegister;
