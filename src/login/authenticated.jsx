import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';


export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
      fetch(`/api/auth/logout`, {
        method: 'delete',
      })
        .catch(() => {
          // Logout failed. Assuming offline
        })
        .finally(() => {
          localStorage.removeItem('userName');
          props.onLogout();
        });
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