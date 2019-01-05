import React from 'react'
import { Button } from 'reactstrap'

let styleP = { borderBottom: '1px solid black', padding: '5px 5px 2px 0px', margin: '10px', textAlign: 'left' };
let styleBtn = { margin: '1px' };
let styleDiv = { textAlign: 'left' }

const AccountInfoBar = ({ onClick1, onClick2, onClick3, network, accountBalance, storeBalance }) => {
    return <div style={styleDiv}>
        <p style={styleP}>Account info & actions</p>
        Network: {network}
        
        <div>
            <Button style={styleBtn} color="primary" size="sm" onClick={onClick1}>btn1</Button>
            <Button style={styleBtn} color="secondary" size="sm" onClick={onClick2}>btn2</Button>
            <Button style={styleBtn} color="success" size="sm" onClick={onClick3}>btn3</Button>
        </div>
    </div>
}

export default AccountInfoBar