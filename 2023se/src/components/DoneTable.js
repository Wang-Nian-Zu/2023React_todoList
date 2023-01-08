import React from 'react';
import {Table} from 'react-bootstrap';
import DoneTableData from './DoneTableData';

function DoneTable(props) {
    const {data} = props;
    const {changeUpdate} = props;
    return (
        <div>
            <Table striped bordered hover>
                <thead style={{backgroundColor: "rgb(0, 255, 0)"}}>
                    <tr>
                        <th>主旨</th>
                        <th>截止日期</th>
                        <th>控制項</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item,index)=>{
                            return(
                                <DoneTableData key={item.id} item = {item} changeUpdate={changeUpdate}/>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}
export default DoneTable;