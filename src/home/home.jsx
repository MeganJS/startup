import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardObj, ProjectObj} from '../project/projectAndCard';

{/*components for projects, friendlist*/}
export function Home() {
  {/*
  const cObj1= new CardObj("Button of DOOM",`button icon.png`, "Item","no one knows where this came from, and no one knows what it does. would you be the first to press it?");
  const cObj2= new CardObj("Agent Squeaker",`dolphin.png`,"Character","Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... ");
  const cObj3= new CardObj("The Arctic Sea",`setting icon.png`,"Setting", "Surprisingly quite cozy, once you get used to it. The seedy underbelly of the seafloor is nothing to laugh at, of course...");
  const cards = [cObj1,cObj2,cObj3];
  const shared = ["A. P. Eerson"];
  let dolProject = new ProjectObj("Dolphins=evil???",cards,shared);
  let projectList = [dolProject];
  localStorage.setItem('projects', JSON.stringify(projectList))
  */}
  
  let blankProject = new ProjectObj("Create New Project",[],[]);
  const [projects, setProjectList] = React.useState([]);
  const [friends, setFriendList] = React.useState([]);

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

  function setCurrentProject(project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
  }

  const projectComps = [];
  if (projects.length) {
    for (const project of projects) {
      projectComps.push(
        <div id="project">
            <NavLink className='nav-link' to='/Project' onClick={()=>setCurrentProject(project)}>{project.title}</NavLink>
        </div>
      );
    }
  }
  projectComps.push(
    <div id="project">
        <NavLink className='nav-link' to='/Project' onClick={()=>setCurrentProject(blankProject)}>Create New Project</NavLink>
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
    const frList = localStorage.getItem('friendList');
    if (frList) {
        return JSON.parse(frList);
    }
    return [];
}

function getProjectList() {
    const prList = localStorage.getItem('projects');
    if (prList) {
        return JSON.parse(prList);
    }
    return [];
}