import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components for projects, friendlist
export function Home() {
    const [projects, setProjectList] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  useEffect(() => {
    const pList = getProjectList();
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
  

  return (
    <main>
        <section id="projects">
            <h2>Projects</h2>
            <section id="projects-list">
                {projectComps}
            </section>
        </section>
        <section id="connections">
            <h2>Connections</h2>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        A. P. Eerson
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <button type="submit"><a href="home.html">disconnect</a></button>
                        <button type="submit"><a href="home.html">see shared projects</a></button>
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Mr. Frogdatterson
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <button type="submit"><a href="home.html">disconnect</a></button>
                        <button type="submit"><a href="home.html">see shared projects</a></button>
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Donna Noble
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <button type="submit"><a href="home.html">disconnect</a></button>
                        <button type="submit"><a href="home.html">see shared projects</a></button>
                    </div>
                </div>
                
                
                </div>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    <label for="find-connection">Request Connection</label>
                    <input type="text" id="find-connection" pattern="\w{1,24}" required/>
                    <button type="submit"><a href="home.html">find</a></button>
                </li>
            </ul>
        </section>

    </main>

  );
}

function getProjectList() {
    const pList = ["Project1","Dolphins=evil???","ProjectTheThird"];
    return pList;
}