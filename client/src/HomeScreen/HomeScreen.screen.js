import React, { Component } from 'react';
import BookList from './components/BookList';

export class HomeScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            books: []
        };
    }

    async componentDidMount(){
        console.log("mounting?")
        let books = (await (await fetch('/book/')).json()).books;
        this.setState({books});
    }

    render() {
        return (
            <div>
                <BookList books={this.state.books}/>
            </div>
        );
    }
}

export default HomeScreen;
