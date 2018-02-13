import React from 'react';
import PropTypes from 'prop-types';

export const CheckList = (props) => { 
    CheckList.propTypes = {
        cardId: PropTypes.number,
        tasks: PropTypes.arrayOf(PropTypes.object)
    }

    let tasksList = props.tasks.map((task) => {
        return (
            <li key={task.id} className="checkbox__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <button className="checklist__task--remove"></button>
            </li>
        );
    });

    console.log('I an in the chekbox', tasksList);

    return (
        <div className="checklist">
            <ul>{tasksList}</ul>
            <input  type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task" />
        </div>
    );
}
