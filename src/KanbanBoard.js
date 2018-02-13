import React from 'react';
import PropTypes from 'prop-types';
import { List } from './List';

export const KanbanBoard = (props) => {
    KanbanBoard.propTypes = {
        cards: PropTypes.arrayOf(PropTypes.object)
    };

    return (
        
        <div className="app">
            <List id="todo" title="To Do" cards={
                props.cards.filter(card => card.status === 'todo')
            } />
            <List id="in-progress" title="In Progress" cards={
                props.cards.filter(card => card.status === 'in-progress')
            } />
            <List id="done" title="Done" cards={
                props.cards.filter(card => card.status === 'done')
            } />
        </div>
    );
}
