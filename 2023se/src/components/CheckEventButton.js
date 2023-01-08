import React , {useState} from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';

function CheckEventButton(props) {
    const { item } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleOpen = () => {
        setShow(true);
    };
    return (
        <>
            <Button variant="info" onClick={handleOpen}>查看</Button>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>{item.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='pt-0 justify-content-center w-80 h-100 mx-auto'>
                        <Row>
                            <Col sm={4}>
                                <h5><span style={{ color: '#566e8b' }}>| </span> 截止日期 </h5>
                            </Col>
                            <Col>
                                <p>{item.dueDate}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <h5><span style={{ color: '#566e8b' }}>| </span> 內容 </h5>
                            </Col>
                            <Col>
                                <p>{item.content}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        關閉
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CheckEventButton;