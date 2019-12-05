import React, { Component } from 'react';

export class BookForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            author: "",
            bookfile: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFileSubmit(e){
        this.setState({
            bookfile: e.target.files[0]
        });
    }

    async submit(e){
        e.preventDefault();

        let data = new FormData();
        data.append('title', this.state.title);
        data.append('author', this.state.author);
        data.append('bookfile', this.state.bookfile);

        this.props.handleSubmit(data);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input name="title" onChange={this.handleChange} value={this.state.title}/>
                <input name="author" onChange={this.handleChange} value={this.state.author}/>
                <input type="file" name="bookfile" onChange={this.handleFileSubmit}/>
                <button onSubmit={this.submit}>submit</button>
            </form>
        );
    }
}

export default BookForm;
