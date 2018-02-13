import React from 'react';
import 'whatwg-fetch';
import { KanbanBoard } from '../KanbanBoard';

export default class KanbanContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    };

    componentDidMount() {
        fetch('./cards.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        console.log('hhh', this.state.cards);
        return (
            <KanbanBoard cards={this.state.cards} />
        );
    }
}
