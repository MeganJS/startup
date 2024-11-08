import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Project } from './project/project';
import { Card } from './card/card';


export default function App() {
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
                    <li className="nav-item">
                        <NavLink className='nav-link' to=''>sign out</NavLink>
                    </li>
                </ul> 
                <a className="navbar-brand" href="#">
                    <img alt="smile icon" src="images/smile icon.png" />
                    username
                </a>
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
                <Route path='/' element={<Login />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/project' element={<Project />} />
                <Route path='/card' element={<Card />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>

        <footer>
            Megan Shellman--<a href="https://github.com/MeganJS/startup">github</a>
        </footer>
        <script 
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" 
            crossorigin="anonymous">
        </script>
    </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}