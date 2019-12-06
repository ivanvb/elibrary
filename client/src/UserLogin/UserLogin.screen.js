import React, { Component } from 'react';
import { UserContext } from '../Shared/context/User.context';
import withAlert from '../Shared/hoc/withAlert';
import Button from 'react-bootstrap/Button';

export class UserLogin extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleChange =  this.handleChange.bind(this);
        this.submit =  this.submit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async submit(e){
        e.preventDefault();
        let req = await fetch('/user/login',{
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });

        if(req.status === 200){
            let json = await req.json();
            const [, setUser] = this.context;
            setUser(()=>{
                return {...json.data, isAuthenticated: true};
            });
        } else {
            this.props.showAlert({message: 'There was an error logging in. Verify your credentials.', variant: 'danger'})
        }
    }

    render() {
        return (
            <>
                <h1 className="mb-3">Login</h1>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" onChange={this.handleChange} name="email" value={this.state.email} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" onChange={this.handleChange} name="password" value={this.state.password}/>
                    </div>
                    
                    <Button type="submit" variant="primary">Submit</Button>
                </form>
            </>
        );
    }
}

UserLogin.contextType = UserContext;
export default withAlert(UserLogin);
