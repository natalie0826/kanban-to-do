import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import constants from './constants';

const ShoppingCartSpec = {
    drop() {
        return { name: 'ShoppingCart' };
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class ShoppingCart extends React.Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#ffffff';

        if (isActive) {
            backgroundColor = '#f7f7bd';
        } else if (canDrop) {
            backgroundColor = 'f7f7f7';
        }

        const style = {
            backgroundColor: backgroundColor
        };

        return connectDropTarget(
            <div className="shopping-cart" style={style}>
                {isActive ?
                    'Hmm, snack!' :
                    'Drag here to order!'
                }
            </div>
        );
    }
}

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);
