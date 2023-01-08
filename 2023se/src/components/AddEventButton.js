import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

function AddEventButton(props) {
    const {changeUpdate} = props;
    const [event, setEvent] = useState({
        title: "",
        content: "",
        dueDate: ""
    });
    const [failtxt, setFailtxt] = useState("");
    const [show, setShow] = useState(false);
    const handleOpen = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
        setEvent({
            title: "",
            content: "",
            dueDate: ""
        });
    };
    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        console.log(event);
    };
    const handleAddEvent = (e) => { //新增代辦事項
        e.preventDefault();
        const sendData = {
            title: event.title,
            content: event.content,
            dueDate: event.dueDate
        };
        console.log(sendData);
        var errortxt;
        if((event.title === "") || (event.content === "") || (event.dueDate === "")){
            errortxt = "表單每個欄位不能空白" ;
        }else{
            errortxt= "" ;
            axios({
                method: "post",
                url: "http://localhost/2023todolist/Control.php?act=addEvent",
                dataType: "JSON",
                data: sendData,
                withCredentials: true
            })
                .then((res) => {
                    console.log(res);
                    var isUpdate = true;
                    if (res.data.status === 'invalid') {
                        alert(res.data.cause);
                    } else {
                        isUpdate = false;
                        alert(res.data.cause);
                    }
                    changeUpdate(isUpdate);
                    handleClose();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        setFailtxt(errortxt);
    }
    return (
        <div style={{ textAlign: "center" }}>
            <Button variant="primary" onClick={handleOpen}>新增事項</Button>

            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>新增事項</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='pt-0 justify-content-center w-80 h-100 mx-auto'>
                        <Form style={{ textAlign: "center" }}>
                            <Row>
                                <Col sm={4}>
                                    <h5><span style={{ color: '#566e8b' }}>| </span> 主旨 </h5>
                                </Col>
                                <Col>
                                    <Form.Control className="title mb-3" placeholder={`主旨`} type="text"
                                        onChange={handleChange} name="title" value={event.title}></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <h5><span style={{ color: '#566e8b' }}>| </span> 內容 </h5>
                                </Col>
                                <Col>
                                    <Form.Control className="content mb-3" placeholder={`內容`} as="textarea"
                                        onChange={handleChange} name="content" value={event.content}></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <h5><span style={{ color: '#566e8b' }}>| </span> 截止日期 </h5>
                                </Col>
                                <Col>
                                    <Form.Control className="time mb-3" type="date"
                                        onChange={handleChange} name="dueDate" value={event.dueDate}></Form.Control>
                                </Col>
                            </Row>
                            <p style={{textAlign:"center", color:"red"}}>{failtxt}</p>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        關閉
                    </Button>
                    <Button variant="primary" onClick={handleAddEvent}>
                        新增
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default AddEventButton;