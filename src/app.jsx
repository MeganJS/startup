import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


export default function App() {
    return (
    <div className="body">
        <header>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <h1>
                        idea-thing
                    </h1>
                
                  <ul class="nav justify-content-center">
                    <li class="nav-item">
                      <a class="nav-link active" id="sign-out" aria-current="page" href="login.html">sign out</a>
                    </li>
                </ul> 
                <a class="navbar-brand" href="#">
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
            App will display here.
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
    );
}