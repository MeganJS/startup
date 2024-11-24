import React from 'react';
import "./home.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardObj, ProjectObj} from '../project/projectAndCard';

{/*components for projects, friendlist*/}
{/*TODO clear localstorage for curProject, curCard when navigate back to home*/}
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
        </section>
        <FriendList></FriendList>
    </main>
  );
}

function FriendList(){
  const frList = getFriendList();
  const [friendList, setFriendList] = React.useState(frList);
  const [friendVal, setFriendVal] = React.useState("__________");

  useEffect(() => {
    fetch('/api/friends', {
      method: "GET",
    })
      .then((response)=>response.json())
      .then((friends)=>{
        setFriendList(friends);
        console.log(friends);
      });
    
    let friends = localStorage.getItem('friendList',JSON.stringify(friendList));
    if (friends){
      return;
    } else {
      localStorage.setItem('friendList', JSON.stringify(friendList));
    }
    //const pList = getProjectList();
    //if (pList) {
      //setProjectList(pList);
    //}
  }, []);

  function changeFriendVal(friend){
    setFriendVal(friend.target.value);
  }

  function addToFriendList(){
    if (friendList.length){
      for (const friend of friendList) {
        if (friend === friendVal) {
          return;
        }
      }
      const newFriends = friendList.slice();
      newFriends.push(friendVal);
      setFriendList(newFriends);
      updateFriendList(newFriends);
    } else {
      const newFriends = [];
      newFriends.push(friendVal);
      setFriendList(newFriends);
      updateFriendList(newFriends);
    }
  }

  {/*TODO add modal to prevent unfriending misclicks*/}
  {/*TODO remove from shared projects as well?*/}
  function removeFriendVal(oldFriend){
    const newFriends = friendList.slice();
    let ind = friendList.indexOf(oldFriend);
    newFriends.splice(ind,1);
    console.log(oldFriend);
    setFriendList(newFriends);
    updateFriendList(newFriends);
  }

  const friendComps = [];
  if (friendList.length) {
    for (const friend of friendList) {
      friendComps.push(
        <li key={friend} className="list-group-item">
            <div>{friend}</div>
            <button className="btn btn-outline-danger btn-sm" type="submit" onClick={()=>removeFriendVal({friend})}>disconnect</button>
            {/*<button type="submit">see shared projects</button>*/}
        </li>
      );
    }
  }
  friendComps.push(
    <li key="Request:" className="list-group-item">
        <label for="find-connection">Request Connection</label>
        <input type="text" id="find-connection" pattern="\w{1,24}" onChange={(i)=>changeFriendVal(i)} required/>
        <button type="submit" className="btn btn-outline-secondary btn-sm" onClick={()=>addToFriendList()}>find</button>
    </li>
  );

  return (
    <section id="connections">
      <ul className="list-group">
          {friendComps}
      </ul>
    </section>
  );
}

function getFriendList() {
    const frList = localStorage.getItem('friendList');
    if (frList) {
        return JSON.parse(frList);
    }
    return [];
}

async function updateFriendList(newFriends) {
  localStorage.setItem('friendList', JSON.stringify(newFriends));
  const response = await fetch('/api/friends', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newFriends),
  });
  if (response?.status === 200) {
    console.log("successfully saved connections change");
    return "success";
  } else {
    const body = await response.json();
    console.log(body.msg);
    return body.msg;
    //setDisplayError(`Error Ocurred: ${body.msg}`);
  }
  //A. P. Eerson,Mr. Frogdatterson,Donna Noble
}

function getProjectList() {
    const prList = localStorage.getItem('projects');
    if (prList) {
        return JSON.parse(prList);
    }
    localStorage.setItem('projects',JSON.stringify([]));
    return [];
}