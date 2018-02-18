import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './shopping.css';

export default class AnimatedShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: 1, name: 'Milk'},
                {id: 2, name: 'Yogurt'},
                {id: 3, name: 'Orabge Juice'},
            ]
        };
    }

    handleChange = (env) => {
        if(env.key === 'Enter') {
            const newItem = {id: Date.now(), name: env.target.value};
            const newItems = this.state.items.concat(newItem);
            env.target.value = '';
            this.setState({items: newItems});
        }
    }

    handleRemove = (i) => {
        let newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    render() {
        const shoppingItems = this.state.items.map((item, i) => {
            return (
                <div key={item.id}
                    className="item"
                    onClick={() => this.handleRemove(i)}>
                    {item.name}
                </div>
            );
        });

        return (
            <div>
                <ReactCSSTransitionGroup    transitionName="example"
                                            transitionEnterTimeout={300}
                                            transitionLeaveTimeout={300}
                                            transitionAppear={true}
                                            transitionAppearTimeout={300}>
                    {shoppingItems}
                </ReactCSSTransitionGroup>
                <input type="text" value={this.state.newItem} onKeyDown={this.handleChange} />
            </div>
        )
    }
}
