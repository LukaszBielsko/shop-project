import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const NavBar = (props) => {

    const handleLogOut = () => {
        props.firebase.doSignOut()
        props.history.push('/')
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>
                    {/* <Link to="/" >
                        <img src={logo} alt="printer logo" />
                    </Link> */}
                    Printer World
                </NavbarBrand>

                {props.isLoggedIn ?
                    <Nav>
                        {!props.isAdmin &&
                            <>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/shop' >Shop</Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <Link to='/cart' >Cart</Link>
                                    </NavLink>
                                </NavItem>
                            </>
                        }
                        <NavItem>
                            <NavLink>
                                <Link to='/orders'>Orders</Link>
                            </NavLink>
                        </NavItem>
                        {props.isAdmin &&
                            <NavItem >
                                <NavLink>
                                    <Link to='/inventory'>Inventory</Link>
                                </NavLink>
                            </NavItem>
                        }
                        {props.isLoggedIn &&
                            <NavItem className="log-out" >
                                <Button
                                    color="secondary"
                                    onClick={() => handleLogOut()} >Log out
                                </Button>
                            </NavItem>
                        }
                    </Nav>
                    : <p>Please log in.</p>
                }
            </Navbar>

        </div>

    )
};

export default withRouter(NavBar);