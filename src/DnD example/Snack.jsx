import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import constants from './constants';

const snackSpec = {
    beginDrag(props) {
        return { name: props.name };
    },

    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
        }
    }
}

let collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const Snack = (props) => {
    Snack.propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
    };

    const { name, isDragging, connectDragSource } = props;

    const opacity = isDragging ? 0.4 : 1;

    const style = { opacity: opacity };

    return connectDragSource(
        <div className="snack" style={style}>
            {name}
        </div>
    )
}

export default DragSource(constants.SNACK, snackSpec, collect)(Snack);
