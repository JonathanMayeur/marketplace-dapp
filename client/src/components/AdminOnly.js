import React from 'react'
import { Row, Col, FormGroup, Form, FormText, Input, Button } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleF = { margin: '0px 0px 0px 10px'};
let styleFG = {textAlign: 'left', marginLeft: '5px'};
let styleBtn = {width: '80px'};

const OwnerOnly = ({ isOwner, onClickAdd }) => {
    if (isOwner === "admin") {
        return (
            <div>
                <h4 style={styleP}>AdminOnly functions</h4>
                <Row>
                    <Col xs="10">
                        <Form style={styleF}>
                            <FormGroup>
                                    <Input type="text" id="newStoreOwnerAddress" placeholder="new store owner address" />
                                    <FormText style={styleFG} id="newStoreOwnerFormText">_</FormText>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs="2">
                        <Button style={styleBtn} onClick={onClickAdd}>Add</Button>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return null;
    }
}

export default OwnerOnly