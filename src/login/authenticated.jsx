import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';


export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }
    return (
        <div>
          <div className='playerName'>{props.userName}</div>
          <Button variant='outline-primary' onClick={() => navigate('/home')}>
            home
          </Button>
          <Button variant='outline-secondary' onClick={() => logout()}>
            logout
          </Button>
    </div>
    );
}