import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

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

        if(this.state.title) data.append('title', this.state.title);
        if(this.state.author) data.append('author', this.state.author);
        if(this.state.bookfile) data.append('bookfile', this.state.bookfile);
        
        this.props.handleSubmit(data);
    }

    render() {
        return (
            <>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Book Title</label>
                        <input className="form-control" name="title" onChange={this.handleChange} value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <label>Book Author</label>
                        <input className="form-control" name="author" onChange={this.handleChange} value={this.state.author}/>
                    </div>
                    <div className="custom-file mb-3">
                        <label className="custom-file-label">Book File</label>
                        <input className="custom-file-input" type="file" name="bookfile" onChange={this.handleFileSubmit}/>
                    </div>

                    <Button type="submit">submit</Button>
                </form>
            </>
        );
    }
}

export default BookForm;
