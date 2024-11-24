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
          let projListStr = localStorage.getItem('projects');
          if (projListStr) {
            localStorage.removeItem('projects');
          }
          let friendsStr = localStorage.getItem('friendList');
          if (friendsStr) {
            localStorage.removeItem('friendList');
          }
          let sharedStr = localStorage.getItem('sharedList');
          if (sharedStr) {
            localStorage.removeItem('sharedList');
          }
          let projStr = localStorage.getItem('currentProject');
          if (projStr) {
            localStorage.removeItem('currentProject');
          }
          let cardStr = localStorage.getItem('currentCard');
          if (cardStr) {
            localStorage.removeItem('currentCard');
          }
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