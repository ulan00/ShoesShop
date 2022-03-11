import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Buy = () => {
    return (
        <Modal.Dialog>
            <Modal.Body>
                <img className='d-block w-100' src="https://softline.uz/uploads/cke/7d/0f/88/tutorial-preview-large.png" alt="galochka" />
                <p>Оплата прошла успешно</p>
            </Modal.Body>
            
            <Modal.Footer>
                <Button href="/" style={{width: '100%', display: "flex", alignItem: 'center', flexDirection: 'column', justifyContent: 'center'}} variant="primary">
                    Принимаю
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export default Buy;