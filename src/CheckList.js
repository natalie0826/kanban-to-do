import React from 'react';
import PropTypes from 'prop-types';

export const CheckList = (props) => { 
    CheckList.propTypes = {
        cardId: PropTypes.number,
        tasks: PropTypes.arrayOf(PropTypes.object),
        taskCallbacks: PropTypes.object
    }

    const checkInputKeyPress = (evt) => {
        if(evt.key === 'Enter') {
            props.taskCallbacks.add(props.cardId, evt.target.value);
            evt.target.value = '';
        }
    }

    const tasksList = props.tasks.map((task, taskIndex) => {
        return (
            <li key={task.id} className="checkbox__task">
                <input type="checkbox" defaultChecked={task.done} onChange={
                    props.taskCallbacks.toggle.bind(null, props.cardId, task.id, taskIndex)}/>
                {task.name}
                <button className="checklist__task--remove" onClick={
                    props.taskCallbacks.delete.bind(null, props.cardId, task.id, taskIndex)}></button>
            </li>
        );
    });

    return (
        <div className="checklist">
            <ul>{tasksList}</ul>
            <input  type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={checkInputKeyPress} />
        </div>
    );
}
