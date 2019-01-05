import React from 'react'
import { Navbar,NavbarBrand,Nav, NavItem } from 'reactstrap'

const HeaderBar = ({ title, address, accountType }) => {
    return <Navbar color="dark" light expand="md" className="text-white">
                <NavbarBrand><b>{title}</b></NavbarBrand>
                    <em>logged in as: {accountType}</em>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {address}
                    </NavItem>
                </Nav>
            </Navbar>;
}

export default HeaderBar