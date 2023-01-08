import React, { useState, useEffect } from 'react';
import AddEvent from './components/AddEventButton.js';
import ToDoTable from './components/ToDoTable.js';
import DoneTable from './components/DoneTable.js';
import { Container, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [donedata, setDonedata] = useState([]);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const changeUpdate = (status) =>{
    setUpdate(status);
  };
  useEffect(() => {
    if(update !== true){
      axios({
        method: "post",
        url: "http://localhost/2023todolist/Control.php?act=getToDoList",
        dataType: "JSON",
        withCredentials: true
      })
        .then((res) => {
          console.log(res);
          var todoList = [];
          var doneList = [];
          for (let i = 0 ; i < res.data.list.length ; i++){
            if(res.data.list[i].status === "undone"){
              todoList.push(res.data.list[i]);
            }else{
              doneList.push(res.data.list[i]);
            }
          }
          setData(todoList);
          setDonedata(doneList);
          setShow(true);
          changeUpdate(true);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [update])

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <AddEvent changeUpdate={changeUpdate}/>
      <Container className='pt-0 justify-content-center w-50 h-100 mx-auto'>
        <Tabs
          defaultActiveKey="todoTable"
          id="tab"
          className="mb-3 pt-5"
          justify
        >
          <Tab eventKey="todoTable" title="待辦事項" >
            <h2 style={{ textAlign: "center" }}>待辦事項</h2>
            {
              (show)&&(
                <ToDoTable data={data} changeUpdate={changeUpdate}/>
              )
            }
          </Tab>
          <Tab eventKey="doneTable" title="已完成事項(歷史紀錄)" >
            <h2 style={{ textAlign: "center" }}>已完成事項</h2>
            {
              (show)&&(
                <DoneTable data={donedata} changeUpdate={changeUpdate}/>
              )
            }
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
export default App;


