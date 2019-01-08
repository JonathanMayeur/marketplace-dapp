import React from 'react'
import { Navbar,NavbarBrand,Nav, NavItem } from 'reactstrap'

const HeaderBar = ({ title, address }) => {
    return <Navbar color="dark" light expand="md" className="text-white">
                <NavbarBrand><b>{title}</b></NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {address}
                    </NavItem>
                </Nav>
            </Navbar>;
}

export default HeaderBar