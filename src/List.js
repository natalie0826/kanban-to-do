import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import constants from './constants/constants';
import Card from './Card';

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id);
    }
};

function collect(connect, monitor) {
    return { connectDropTarget: connect.dropTarget() };
}

const List = (props) => {
    List.propTypes = {
        title: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.object),
        taskCallbacks: PropTypes.object,
        cardCallbacks: PropTypes.object,
        connectDropTarget: PropTypes.func.isRequired
    };

    let cards = props.cards.map((card) => {
        return <Card    key={card.id}
                        taskCallbacks={props.taskCallbacks}
                        cardCallbacks={props.cardCallbacks}
                        {...card} />
    });

    return props.connectDropTarget(
        <div className="list">
            <h1>{props.title}</h1>
            {cards}
        </div>
    )
}

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
