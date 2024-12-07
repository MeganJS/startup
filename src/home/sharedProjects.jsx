import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SharedProjects(props) {
  const [projects, setProjectList] = React.useState([]);

  useEffect(() => {
    fetch('/api/projects/shared', {
      method: "GET",
    })
      //.then((response)=>console.log(response))
      .then((response)=>response.json())
      .then((projects)=>{
        setProjectList(projects);
        console.log(projects);
      });
      //localStorage.setItem('projects', JSON.stringify(projects));
  }, []);

  function setCurrentProject(project) {
    localStorage.setItem('currentProject', JSON.stringify(project));
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  const projectComps = [];
  if (projects.length) {
    for (const project of projects) {
      projectComps.push(
        <div id="project">
            <NavLink className='nav-link' to='/project-shared' onClick={()=>setCurrentProject(project)}>{project.title}</NavLink>
        </div>
      );
    }
  }
  /*
  projectComps.push(
    <div id="project">
        <NavLink className='nav-link' to='/Project' onClick={()=>createNewProject(blankProject)}>
        <div>new</div>
        <img src='plus-circle.svg' />
        </NavLink>
    </div>
  );
  */

  return (
        <section id="projects">
            <h2>Shared With Me</h2>
            <section id="projects-list">
                {projectComps}
            </section>
        </section>
  );
}
