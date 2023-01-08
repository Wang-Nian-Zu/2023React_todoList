import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

function DeleteEventButton(props){
    const { id } = props;
    const {changeUpdate} = props;
    const handleDelete = () =>{
        console.log("delete Event");
        axios({
            method: "get",
            url: "http://localhost/2023todolist/Control.php?act=deleteEvent&id="+ id,
            dataType: "JSON",
            withCredentials: true
          })
            .then((res) => {
                console.log(res);
                var isUpdate = true;
                if(res.data.status === "valid"){
                    alert(res.data.cause);
                    isUpdate = false;
                }
                changeUpdate(isUpdate);
            })
            .catch((error) => {
              console.log(error);
            })
    };
    return(
        <>
            <Button variant="danger" onClick = {handleDelete}>刪除</Button>
        </>
    );
} 
export default DeleteEventButton;