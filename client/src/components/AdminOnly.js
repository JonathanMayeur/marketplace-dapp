import React from 'react'
// import { Row, Col, FormGroup, Form, FormText, Input, Button } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleF = { margin: '0px 0px 0px 10px'};
let styleFG = {textAlign: 'left', marginLeft: '5px'};
let styleBtn = {width: '80px'};

const OwnerOnly = ({ isOwner }) => {
    if (isOwner === "owner") {
        return (
            <div>
                <h4 style={styleP}>AdminOnly functions</h4>
                
            </div>
        );
    } else {
        return null;
    }
}

export default OwnerOnly