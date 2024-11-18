import React from 'react';

import Button from 'react-bootstrap/Button';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { MessageDialog } from './messageDialog';


export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }
    
    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
          <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <label for="inputUsername" className="col-sm-2 col-form-label">Username</label>
                        <input type="text" className="form-control" id="inputUsername" onChange={(e) => setUserName(e.target.value)} pattern="\w{1,24}" required />
                    </div>
                  </div>
                
                <div className="form-group row">
                  
                <div className="col-sm-10">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" pattern="{8,24}" onChange={(e) => setPassword(e.target.value)} required />
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