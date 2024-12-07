import React from 'react';
import "./project.css";
import { useState, useEffect } from 'react';

export default function SharedWith(props){
    const sList = getSharedList();
    //const frList = getFriendList();
    const [sharedList, setSharedList] = React.useState(sList);
    const [friendList, setFriendList] = React.useState([]);
    const [shareVal, setShareVal] = React.useState("__________");
    const [saveMsg, setSaveMsg] = React.useState("");
  
    useEffect(() => {
      let frListStr = localStorage.getItem('friendList');
      if (frListStr){
        let frList = JSON.parse(frListStr);
        setFriendList(frList);
      }
    }, []);
  
    /*
    async function getFriendList() {
      fetch('/api/friends')
        .then((response) => response.json())
        .then((friends) => {
          setFriendList(friends);
        });
      
      const response = await fetch('/api/friends', {
        method: 'GET',
      });
      if (response?.status === 200) {
        console.log(response.body);
        
        const body = await response.json();
        console.log(body);
        localStorage.setItem('friendList', JSON.stringify(body));
        return body;
        //props.onLogin(userName);
      } else {
        return [];
      }
        
    }
      */
  
    function changeShareVal(friend){
      setShareVal(friend);
    }
  
    function addToSharedList(shareVal){
      for (const shared of sharedList) {
        if (shared === shareVal) {
          return;
        }
        if (shared === "__________") {
          return;
        }
      }
      const newShare = sharedList.slice();
      newShare.push(shareVal);
      setSharedList(newShare);
      updateSharedList(newShare);
      sendSharedProject(shareVal);
    }
  
    function removeShareVal(shareVal){
      const newShare = sharedList.slice();
      let ind = sharedList.indexOf(shareVal);
      newShare.splice(ind,1);
      setSharedList(newShare);
      updateSharedList(newShare);
      deleteSharedProject(shareVal);
    }
  
    async function updateSharedList(newSharedList) {
      let projectList = getProjectList();
      let project = getCurProject();
      for (const proj of projectList) {
        if (proj.title === project.title) {
          proj.sharedList = newSharedList;
          localStorage.setItem("currentProject",JSON.stringify(proj));
          localStorage.setItem('projects',JSON.stringify(projectList));
          let saveRes = await saveProjectChange(projectList);
          if (saveRes !== "success") {
              console.log(saveRes);
              setSaveMsg(`Could not save, error: ${saveRes}`);
          } else {
              setSaveMsg("");
              console.log(saveRes);
          }
          //let saveResult = saveProjectChange(projectList);
          //if (saveResult !== "success"){
          //  setSaveMsg("Unable to save: " + saveResult);
          //}
        }
      }
    }

    async function sendSharedProject(shareVal){
        let curProj = getCurProject();
        const shProject = {
            title: curProj.title,
            sharedby: props.username,
            cardList: curProj.cardList
        }
        await fetch('/api/shared', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({userToAdd: shareVal, shProject: shProject}),
        });
    }

    async function deleteSharedProject(shareVal){
        let curProj = getCurProject();
        await fetch('/api/shared', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({userToRemove: shareVal, sharedby: props.username, title: curProj.title}),
        });
    }    
  
    const sharedComps = [];
    if (sharedList.length) {
      for (const shared of sharedList) {
        sharedComps.push(
          <li key={shared} className="list-group-item">
            {shared}
            <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={()=>removeShareVal(shared)}>unshare</button>
          </li>
        );
      }
    }
  
    const friendComps = [];
    if (friendList.length) {
      for (const friend of friendList) {
        friendComps.push(
          <li key={friend}><a className="dropdown-item" href="#" onClick={()=>changeShareVal(friend)}>{friend}</a></li>
        );
      }
    }
  
    return (
      <section id="shared">
        {saveMsg}
        <b>Shared with:</b>
        <ul className="list-group">
          {sharedComps}
          <li key="Add:" className="list-group-item" id="share-with">
            <p>Add:</p>
            <div className="dropdown">
              <a className="btn btn-dark btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {shareVal}
              </a>
              <ul className="dropdown-menu">
                {friendComps}
              </ul>
            </div>
            <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={()=>addToSharedList(shareVal)}>submit</button>
          </li>
        </ul>
      </section>
    );
  }
  
  async function saveProjectChange(newList) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newList),
    });
    if (response?.status === 200) {
      console.log("successfully saved project change");
      return "success";
    } else {
      const body = await response.json();
      console.log(body.msg);
      return body.msg;
      //setDisplayError(`Error Ocurred: ${body.msg}`);
    }
  }
  
  function getSharedList() {
    const projectStr = localStorage.getItem('currentProject');
    if (projectStr) {
        return JSON.parse(projectStr).sharedList;
    }
    return [];
  }
  
  function getCurProject(){
    let curProjectStr = localStorage.getItem('currentProject');
    let curProj = JSON.parse(curProjectStr);
    return curProj;
  }
  
  function getProjectList(){
    let projectListStr = localStorage.getItem('projects');
    let projectList = JSON.parse(projectListStr);
    return projectList;
  }