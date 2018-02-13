import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { CheckList } from './CheckList';

let titlePropType = (props, propName, componentName) => {
    if(props[propName]) {
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            );
        }
    }
};

export default class Card extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        title: titlePropType,
        description: PropTypes.string,
        color: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.object)
    };

    constructor(props) {
        super(props);
        this.state = {
            showDetails: true
        };
    }

    toggleDetails = () => {
        this.setState({showDetails: !this.state.showDetails})
    }

    render() {
        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks}/>
                </div>
            )
        }

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        return (
            <div className="card">
                <div style={sideColor} />
                <div className={
                    this.state.showDetails ? "card__title card__title--is-open" : "card__title"
                } onClick={this.toggleDetails}>{this.props.title}</div>
                {cardDetails}
            </div>
        );
    }
}
