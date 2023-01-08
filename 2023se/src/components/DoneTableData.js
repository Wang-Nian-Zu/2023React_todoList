import React from 'react';
import CheckEventButton from './CheckEventButton';
import DeleteEventButton from './DeleteEventButton';

function ToDoTableData(props) {
    const {item} = props;
    const {changeUpdate} = props;
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.dueDate}</td>
            <td>
                <CheckEventButton item={item}/>&nbsp;
                <DeleteEventButton id={item.id} changeUpdate={changeUpdate}/>
            </td>
        </tr>
    );
}
export default ToDoTableData;