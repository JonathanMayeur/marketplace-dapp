import React from 'react'
import { Row, Col, FormGroup, Form, FormText, Input, Button, Table } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleF = { margin: '0px 0px 0px 10px' };
let styleT = { margin: '0px 0px 0px 10px' };
let styleFG = { textAlign: 'left', marginLeft: '5px' };
let styleBtn = { width: '80px' };

const AdminOnly = ({ isOwner, onClickAdd, onClickDisable, storeOwnerArray }) => {
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
                <Row>
                    <Col xs="10">
                        <Form style={styleF}>
                            <FormGroup>
                                <Input type="text" id="disableStoreOwnerAddress" placeholder="disable store owner address" />
                                <FormText style={styleFG} id="disableStoreOwnerFormText">_</FormText>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs="2">
                        <Button style={styleBtn} onClick={onClickDisable}>Disable</Button>
                    </Col>
                </Row>

                <Row>
                    <Table size="sm" id="table" style={styleT}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Address</th>
                                <th>Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storeOwnerArray.map(p => <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.address}</td>
                                <td>{p.enrolled}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    } else {
        return null;
    }
}

export default AdminOnly