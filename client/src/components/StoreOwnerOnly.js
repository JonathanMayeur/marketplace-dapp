import React from 'react'
import { Row, Col, FormGroup, Form, FormText, Input, Button, Table } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleF = { margin: '0px 0px 0px 10px' };
let styleT = { margin: '0px 0px 0px 10px' };
let styleBtn = { width: '200px', margin: '10px' };

const AdminOnly = ({ isOwner, onClickAdd, onClickDisable, storeOwnerArray }) => {
    if (isOwner === "storeOwner") {
        return (
            <div>
                <h4 style={styleP}>StoreOwner only functions</h4>
                <Row>
                    <Col xs="10">
                        <Form style={styleF}>
                            <FormGroup>
                                <Input type="text" id="articleName" placeholder="Name of new article" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" id="articleDescription" placeholder="Description of new article" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" step="1" id="articlePrice" placeholder="article price" />
                                <FormText id="articleReturn">_</FormText>
                            </FormGroup>
                        </Form>
                        <Button style={styleBtn} onClick={onClickAdd}>Add Article</Button>
                    </Col>
                </Row>

                <Row>
                    <Table size="sm" id="table" style={styleT}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Buyer</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {storeOwnerArray.map(p => <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.address}</td>
                                <td>{p.enrolled}</td>
                            </tr>)} */}
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