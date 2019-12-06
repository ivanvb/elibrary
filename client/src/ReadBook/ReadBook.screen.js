import React, { Component } from 'react';

export class ReadBook extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: ""
        };
    }

    async componentDidMount(){
        let text = (await(await fetch(`/book/text/${this.props._id}`)).json()).text;
        this.setState({text});
    }

    render() {
        return (
            <div>
                {this.state.text ? this.state.text : "Loading"}
            </div>
        );
    }
}

export default ReadBook;
