import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Project } from './project/project';
import { Card } from './card/card';
import { CardEdit } from './card-edit/card-edit';
import { AuthState } from './login/authState';


export default function App() {
    const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    //const [eventNotifier, setNotifier] = React.useState("");

    return (
    <BrowserRouter>
    <div className="body">
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <h1>
                        idea-thing
                    </h1>
                
                  <ul className="nav justify-content-center">
                  {authState === AuthState.Authenticated && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='home'>
                                home
                            </NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to=''>
                                account
                            </NavLink>
                        </li>
                    )}
                </ul> 
                {authState === AuthState.Authenticated && (
                    <div>
                        <a className="navbar-brand" href="#">
                            <img alt="smile icon" src="smile icon.png" data-bs-toggle="modal" data-bs-target="#editProfileModal" />
                            {username}
                        </a>
                        {/*}
                        <div className="modal fade" id="editProfileModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="editTitleModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">get new profile image</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="input-group mb-3">
                                            Upload a profile picture:
                                            <input type="file" name="file" accept="image/*" onChange={(i)=>changeProfile(i)} />
                                            <button onClick={()=>saveProfile()} className="btn btn-outline-secondary" type="button" id="button-addon1">save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        */}
                    </div>
                )}
                </div>
            </nav>
            
            <div id="profile-menu" hidden>
                <button type="submit" id="change-picture">change picture</button>
                <button type="submit" id="change-user">change username</button>
                <button type="submit" id="change-password">change password</button>
            </div>
        </header>

        <main>
            <Routes>
                <Route path='/' element={<Login 
                    username={username}
                    authState={authState}
                    //notifier={eventNotifier}
                    onAuthChange={(username, authState) => {
                        setAuthState(authState);
                        setUserName(username);
                        //setNotifier(notifier);
                    }}/>} exact />
                <Route path='/home' element={<Home username={username}/>} />
                <Route path='/project' element={<Project shared={false} username={username}/>} />
                <Route path='/project-shared' element={<Project shared={true} username={username}/>} />
                <Route path='/card' element={<Card shared={false} username={username}/>} />
                <Route path='/card-shared' element={<Card shared={true} username={username}/>} />
                <Route path='/card-edit' element={<CardEdit username={username} />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>

        <footer>
            Megan Shellman--<a href="https://github.com/MeganJS/startup">github</a>
        </footer>
    </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}
