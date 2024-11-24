import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';


export function Authenticated(props) {
    const navigate = useNavigate();
    const [randItem, setRandItem] = React.useState("");
    const [randTrait, setRandTrait] = React.useState("");


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

    function dndRollItem(){
      const url = "https://set.world/api/roll/set";
      fetch(url)
        .then((x)=>x.json())
        .then((response)=>{
          //pick random type from list?
            setRandItem(JSON.stringify(response.head.name));
        });
    }

    function dndRollTrait(){
      const url = "https://set.world/api/roll/character";
      fetch(url)
        .then((x)=>x.json())
        .then((response)=>{
            setRandTrait(JSON.stringify(response));
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
          <div>
            want some random ideas?
            <button onClick={() => dndRollItem()}>character equipment</button>
            <button onClick={() => dndRollTrait()}>character trait</button>
            {randItem}
            {randTrait}
          </div>
    </div>
    );
}