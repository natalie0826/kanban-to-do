import React from 'react';
import PropTypes from 'prop-types';
import { List } from './List';

export const KanbanBoard = (props) => {
    KanbanBoard.propTypes = {
        cards: PropTypes.arrayOf(PropTypes.object),
        taskCallbacks: PropTypes.object
    };

    return (
        
        <div className="app">
            <List id="todo" title="To Do" taskCallbacks={props.taskCallbacks} cards={
                props.cards.filter(card => card.status === 'todo')
            } />
            <List id="in-progress" title="In Progress" taskCallbacks={props.taskCallbacks} cards={
                props.cards.filter(card => card.status === 'in-progress')
            } />
            <List id="done" title="Done" taskCallbacks={props.taskCallbacks} cards={
                props.cards.filter(card => card.status === 'done')
            } />
        </div>
    );
}
