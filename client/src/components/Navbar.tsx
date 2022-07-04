import React from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const NavbarPanel = () => {
  // const [image, setImage] = useState();
  const { user, isAuthenticated, logout } = useAuth0();

  const UserMenu = (
    <Image
      src={user?.picture}
      alt="UserName profile image"
      roundedCircle
      style={{ width: "40px" }}
    />
  );

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>App</Navbar.Brand>
        <LinkContainer to="/">
          <Nav.Link>Main</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/player">
          <Nav.Link>Player</Nav.Link>
        </LinkContainer>
        <LinkContainer
          to={`/profile/${user?.sub?.replace("auth0|", "")}/tracks/upload`}
        >
          <Nav.Link>Upload</Nav.Link>
        </LinkContainer>
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <NavDropdown title={UserMenu}>
              <NavDropdown.Item
                as={NavLink}
                to={`/profile/${user?.sub?.replace("auth0|", "")}`}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LoginButton />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPanel;
