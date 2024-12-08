import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import { EventNotifier, Event } from '../Notifier';
import "./login.css";

{/*copied all my login code stuff from simon*/}
export function Login({userName, notifier, authState, onAuthChange}) {
  return (
    <main className='container-fluid text-center'>
      <div>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && 
          (<Authenticated userName={userName} notifier={notifier} onLogout={() => onAuthChange(userName, "", AuthState.Unauthenticated)} />)}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName, notifier) => {
              onAuthChange(loginUserName, notifier, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}