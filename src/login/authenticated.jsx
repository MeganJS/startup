import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import AccountNotifs from './accountNotifs';


export function Authenticated(props) {
    const navigate = useNavigate();
    const [randItem, setRandItem] = React.useState("");
    const [randSkill, setRandSkill] = React.useState("");
    const [randTrait, setRandTrait] = React.useState("");



    function logout() {
      fetch(`/api/auth/logout`, {
        method: 'delete',
      })
        .catch(() => {
          // Logout failed. Assuming offline
        })
        .finally(() => {
          localStorage.removeItem('username');
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
          const {head,tool,offhand,back,hand,finger,feet,legs,neck,shoulders,waist,wrist,chest}=response;
          const types = [head,tool,offhand,back,hand,finger,feet,legs,neck,shoulders,waist,wrist,chest];
          const ind = Math.floor(Math.random() * 13);
          if (types[ind].name){
            setRandItem(types[ind].name);
          } else {
            dndRollItem();
          }
          //13 total options

            //setRandItem(response);
        });
    }

    function dndRollSkill(){
      const url = "https://set.world/api/roll/character";
      fetch(url)
        .then((x)=>x.json())
        .then((response)=>{
            let skills = response.traits.skills;
            if (skills){
              const ind = Math.floor(Math.random() * skills.length);
              setRandSkill(skills[ind].name);
            } else {
              dndRollSkill();
            }
        });
    }

    function dndRollTrait(){
      const url = "https://set.world/api/roll/character";
      fetch(url)
        .then((x)=>x.json())
        .then((response)=>{
            let coin = Math.floor(Math.random() * 2);
            let adv = [];
            if (coin === 1) {
              adv = response.traits.advantages;
            } else {
              adv = response.traits.disadvantages;
            }
            if (adv){
              const ind = Math.floor(Math.random() * adv.length);
              setRandTrait(adv[ind].name);
            } else {
              dndRollTrait();
            }
        });
    }

    return (
        <div>
          <div className='playerName'>{props.username}</div>
          <Button variant='outline-primary' onClick={() => navigate('/home')}>
            home
          </Button>
          <Button variant='outline-secondary' onClick={() => logout()}>
            logout
          </Button>
          <div>
            in need of inspiration?
            <button onClick={() => dndRollItem()}>character equipment</button>
            <button onClick={() => dndRollSkill()}>character skill</button>
            <button onClick={() => dndRollTrait()}>character trait</button>
            <div>{randItem}</div>
            <div>{randSkill}</div>
            <div>{randTrait}</div>
          </div>
          <div className="prompt-and-response">
            <Prompt username={props.username}></Prompt>
            <AccountNotifs username={props.username}></AccountNotifs>
          </div>
    </div>
    );
}