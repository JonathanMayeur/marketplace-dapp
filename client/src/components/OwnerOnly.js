import React from 'react'
import { Row, Col, FormGroup, Form, Input, Button } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleF = { margin: '0px 0px 0px 10px'};

const OwnerOnly = ({ isOwner, onClickAdd }) => {
    if (isOwner === "owner") {
        return (
            <div>
                <h4 style={styleP}>OwnerOnly functions</h4>
                <Row>
                    <Col xs="10">
                        <Form style={styleF}>
                            <FormGroup>
                                    <Input type="text" id="newAdminAddress" placeholder="new Admin Address" />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs="2">
                        <Button onClick={onClickAdd}>Add</Button>
                    </Col>
                </Row>
                <br />
            </div>
        );
    } else {
        return null;
    }
}

export default OwnerOnly