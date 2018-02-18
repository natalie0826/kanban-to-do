import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export const List = (props) => {
    List.propTypes = {
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object),
        taskCallbacks: PropTypes.object
    };

    let cards = props.cards.map((card) => {
        return <Card    key={card.id}
                        taskCallbacks={props.taskCallbacks}
                        {...card} />
    });

    return (
        <div className="list">
            <h1>{props.title}</h1>
            {cards}
        </div>
    )
}
