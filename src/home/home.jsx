import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardObj, ProjectObj} from '../project/projectAndCard';
import FriendReqs from './friendReqs';
import SharedProjects from './sharedProjects';

export function Home(props) {
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
  const [userName, setUserName] = React.useState(props.userName);
  let blankProject = new ProjectObj("Idea Title",[],[]);
  const [projects, setProjectList] = React.useState([]);

  useEffect(() => {
    fetch('/api/projects', {
      method: "GET",
    })
      //.then((response)=>console.log(response))
      .then((response)=>response.json())
      .then((projects)=>{
        setProjectList(projects);
        console.log(projects);
      });
      //localStorage.setItem('projects', JSON.stringify(projects));

    //const pList = getProjectList();
    //if (pList) {
      //setProjectList(pList);
    //}
  }, []);

  function setCurrentProject(project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
    localStorage.setItem('projects', JSON.stringify(projects));

  }

  async function createNewProject(project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
    let projectList = projects.slice();
    //let projectListStr = localStorage.getItem('projects');
    let cProject = { ...project };
    if (projectList) {
      //let projectList = JSON.parse(projectListStr);
      //let cProjectList = projectList.slice();
      for (const proj of projectList) {
        if (proj.title === cProject.title) {
          cProject.title = cProject.title + '+';
        }
      }
      projectList.push(cProject);
      localStorage.setItem('projects',JSON.stringify(projectList));
      const toPost = projectList;
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(toPost),
      });
    } else {
      let newProjectList = [project];
      localStorage.setItem('projects',JSON.stringify(newProjectList));
      const toPost = newProjectList;
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(toPost),
      });
    }
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
        <NavLink className='nav-link' to='/Project' onClick={()=>createNewProject(blankProject)}>
        <div>new</div>
        <img src='plus-circle.svg' />
        </NavLink>
    </div>
  );

  return (
    <main>
        <section id="projects">
            <h2>Projects</h2>
            <section id="projects-list">
                {projectComps}
            </section>
            <SharedProjects></SharedProjects>
        </section>
        <FriendReqs></FriendReqs>
    </main>
  );
}
