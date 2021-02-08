import { useState } from 'react';
import { Button } from 'reactstrap';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import avtar from '../images/avtar.png';

const Header = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [userName, setUserName] = useState("");

    return (
        <div>
            <Navbar color="dark" dark expand="md">

                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="#">Company logo/name</NavLink>
                    </NavItem>
                </Nav>
                {
                    props.loggedin ? (
                        <>
                            <NavbarText><img className="avtar" src={avtar} alt="" /></NavbarText>
                            <NavbarText style={{ padding: "5px" }} >{props.userName}</NavbarText>
                            <NavbarText style={{ padding: "5px" }}>${props.winningAmount}</NavbarText>
                            <Button onClick={() => props.logout(props.userName)}>Logout</Button>
                        </>
                    ) : (
                            <>
                                <NavbarText style={{ padding: "5px" }}>{props.userName}</NavbarText>
                                <Button onClick={() => setShowLogin(true)}>Login</Button>
                            </>
                        )
                }

            </Navbar>
            {
                showLogin ? (
                    <div>
                        <input placeholder="user name" onChange={(e) => setUserName(e.target.value.trim())} />
                        <Button onClick={() => {
                            props.login(userName);
                            setShowLogin(false);
                        }} disabled={userName.length === 0}>Login</Button>
                    </div>
                ) : null
            }

        </div>
    );
}

export default Header;