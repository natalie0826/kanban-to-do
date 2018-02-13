import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export const List = (props) => {
    List.propTypes = {
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object)
    };

    let cards = props.cards.map((card) => {
        return <Card    key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        color={card.color}
                        tasks={card.tasks} />
    });

    return (
        <div className="list">
            <h1>{props.title}</h1>
            {cards}
        </div>
    )
}
