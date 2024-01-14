import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider/context';

const NavBar = () => {
  const navigate = useNavigate();

  const { user, signInWithGoogle } = useContext(AuthContext);

  return (
    <Navbar expand={'lg'} className={'bg-dark pe-3 ps-3'}>
      <Navbar.Toggle aria-controls='basic-navbar-nav' style={{
        border: '1px solid #fff',
      }}
      />
      <Navbar.Brand href={'/'} className={'text-light'}>
        Task Management App
      </Navbar.Brand>
      <Navbar.Collapse id='basic-navbar-nav' className={'justify-content-end'}>
        <Nav className='me-auto'>
          <Nav.Link onClick={() => navigate('/')} className={'text-light'}>
            Home
          </Nav.Link>
          <Nav.Link onClick={() => navigate('/dashboard')} className={'text-light'}>
            Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => navigate('/settings')} className={'text-light'}>
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        {!user && (
          <Button variant='success' onClick={signInWithGoogle}>
            Sign in
          </Button>
        )}
      </Navbar.Text>
    </Navbar>
  );
};

export default NavBar;
