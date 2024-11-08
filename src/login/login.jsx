import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./login.css";


export function Login() {
  return (
    <main>
            <form>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <label for="inputUsername" className="col-sm-2 col-form-label">Username</label>
                        <input type="username" className="form-control" id="inputUsername" pattern="\w{1,24}" required />
                    </div>
                  </div>
                
                <div className="form-group row">
                  
                <div className="col-sm-10">
                    <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" pattern="{8,24}" required />
                </div>
                </div>
                <button type="submit" id="login">
                    <NavLink className='nav-link' to='/Home'>login</NavLink>
                </button>
                <button type="submit" id="create-account">
                    <NavLink className='nav-link' to='/Home'>create account</NavLink>
                </button>
            </form>    
    </main>
  );
}