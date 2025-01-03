import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
//import { EventNotifier, Event } from '../Notifier';
import "./login.css";

{/*copied all my login code stuff from simon*/}
export function Login({username, authState, onAuthChange}) {
  return (
    <main className='container-fluid text-center'>
      <div>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && 
          (<Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated)} />)}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            username={username}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}