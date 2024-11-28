import React from 'react';

import Button from 'react-bootstrap/Button';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { MessageDialog } from './messageDialog';


export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }
    
    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }
    
    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ username: userName, password: password, projects: [], friends: [] }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        if (response?.status === 200) {
          localStorage.setItem('userName', userName);
          props.onLogin(userName);
        } else {
          const body = await response.json();
          setDisplayError(`Error Ocurred: ${body.msg}`);
        }
    }

    
    return (
        <>
          <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <label for="inputUsername" className="col-sm-2 col-form-label">Username</label>
                        <input type="text" className="form-control" id="inputUsername" onChange={(e) => setUserName(e.target.value)} required />
                    </div>
                  </div>
                
                <div className="form-group row">
                  
                <div className="col-sm-10">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                </div>
                <Button id="login" variant='outline-primary' onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <Button id="create-account" variant='outline-secondary' onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
            </form> 
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
    
}