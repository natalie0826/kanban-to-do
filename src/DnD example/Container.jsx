import React from'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ShoppingCart from './ShoppingCart';
import Snack from './Snack';
import './dndstyles.css';

class Container extends React.Component {
    render() {
        return (
            <div>
                <Snack name="Chips" />
                <Snack name="Cupcake" />
                <Snack name="Donut" />
                <Snack name="Doritos" />
                <Snack name="Popcorn" />
                <ShoppingCart />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Container);
