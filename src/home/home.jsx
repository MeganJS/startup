import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components for projects, friendlist
export function Home() {
    const [projects, setProjectList] = React.useState([]);
    const [friends, setFriendList] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  useEffect(() => {
    const pList = getProjectList();
    const frList = getFriendList(); 
    if (frList) {
        setFriendList(frList);
      }
    if (pList) {
      setProjectList(pList);
    }
  }, []);

  // Demonstrates rendering an array with React
  const projectComps = [];
  if (projects.length) {
    for (const project of projects) {
      projectComps.push(
        <div id="project">
            <NavLink className='nav-link' to='/Project'>{project}</NavLink>
        </div>
      );
    }
  }
  projectComps.push(
    <div id="project">
        <NavLink className='nav-link' to='/Project'>Create New Project</NavLink>
    </div>
  );

  const friendComps = [];
  if (friends.length) {
    for (const friend of friends) {
      friendComps.push(
        <li className="list-group-item">
            <div>{friend}</div>
            <button type="submit"><a href="home.html">disconnect</a></button>
            <button type="submit"><a href="home.html">see shared projects</a></button>
        </li>
      );
    }
  }
  friendComps.push(
    <li className="list-group-item">
        <label for="find-connection">Request Connection</label>
        <input type="text" id="find-connection" pattern="\w{1,24}" required/>
        <button type="submit"><a href="home.html">find</a></button>
    </li>
  );

  return (
    <main>
        <section id="projects">
            <h2>Projects</h2>
            <section id="projects-list">
                {projectComps}
            </section>
        </section>
        <section id="connections">
            <ul className="list-group">
                {friendComps}
            </ul>
        </section>
    </main>
  );
}

function getFriendList() {
    const frList = ["A. P. Eerson","Mr. Frogdatterson","Donna Noble"];
    return frList;
}

function getProjectList() {
    const pList = ["Project1","Dolphins=evil???","ProjectTheThird"];
    return pList;
}