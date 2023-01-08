import React from 'react';
import {Table} from 'react-bootstrap';
import ToDoTableData from './ToDoTableData';

function ToDoTable(props) {
    const {data} = props;
    const {changeUpdate} = props;
    return (
        <div>
            <Table striped bordered hover>
                <thead style={{backgroundColor: "rgb(255, 255, 128)"}}>
                    <tr>
                        <th>主旨</th>
                        <th>截止日期</th>
                        <th>狀態</th>
                        <th>控制項</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item)=>{
                            return(
                                <ToDoTableData key={item.id} item={item} changeUpdate={changeUpdate}/>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}
export default ToDoTable;