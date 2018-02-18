import React from 'react';
import 'whatwg-fetch';
import update from 'react-addons-update';
import KanbanBoard from '../KanbanBoard';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'natashkachobot@mail.ru'
};

export default class KanbanContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    };

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    addTask = (cardId, taskName) => {
        const prevState = this.state;
        const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
        const newTask = {id: Date.now(), name: taskName, done: false};
        const nextState = update(this.state.cards, {
                            [cardIndex]: { tasks: {$push: [newTask]} }
                        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Server response wasn't ok`);
            }
        })
        .then((responseData) => {
            newTask.id = responseData.id;
            this.setState({cards: nextState});
        })
        .catch((error) => {
            console.error('Fetch error', error);
            this.setState(prevState);
        })
    }

    deleteTask = (cardId, taskId, taskIndex) => {
        const prevState = this.state;
        const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
        const nextState = update(this.state.cards, {
                            [cardIndex]: {
                                tasks: {$splice: [[taskIndex, 1]]}
                            }
                        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server response wasn't ok`);
            }
        })
        .catch((error) => {
            console.error('Fetch error', error);
            this.setState(prevState);
        })
    }

    toggleTask = (cardId, taskId, taskIndex) => {
        const prevState = this.state;
        const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
        let newDoneValue;
        const nextState = update(this.state.cards, {
                            [cardIndex]: {
                                tasks: {
                                    [taskIndex]: {
                                        done: { $apply: (done) => {
                                            newDoneValue = !done;
                                            return newDoneValue;
                                        }}
                                    }
                                }
                            }
                        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server response wasn't ok`);
            }
        })
        .catch((error) => {
            console.error('Fetch error', error);
            this.setState(prevState);
        })
    }

    updateCardStatus = (cardId, listId) => {
        const cardIndex = this.state.cards.findIndex(card => card.id === cardId);
        const card = this.state.cards[cardIndex];
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }));
        }
    }

    updateCardPosition = (cardId, afterId) => {
        if (cardId !== afterId) {
            const cardIndex = this.state.cards.findIndex(card => card.is === cardId);
            const card = this.state.cards[cardIndex];
            const afterIndex = this.state.cards.findIndex(card => card.id === afterId);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    render() {
        return (
            <KanbanBoard    cards={this.state.cards}
                            taskCallbacks={{
                                toggle: this.toggleTask,
                                delete: this.deleteTask,
                                add: this.addTask }}
                            cardCallbacks={{
                                updateStatus: this.updateCardStatus,
                                updatePosition: this.updateCardPosition
                            }} />
        );
    }
}
