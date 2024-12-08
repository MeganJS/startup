import React from 'react';
import "./home.css";
import { useState, useEffect } from 'react';
import { Event, Notifier } from '../Notifier';


export default function FriendList(props){
    const username=props.username;
    const [friendList, setFriendList] = React.useState(props.frList);
    const [friendVal, setFriendVal] = React.useState("__________");
  
    useEffect(() => {
      fetch('/api/friends', {
        method: "GET",
      })
        .then((response)=>response.json())
        .then((friends)=>{
          setFriendList(friends);
          //console.log(friends);
          //console.log(friendList);
          localStorage.setItem('friendList', JSON.stringify(friends));
        });
    }, []);
  
    function changeFriendVal(friend){
      setFriendVal(friend.target.value);
    }
  
    //TODO add modal to prevent unfriending misclicks
    //TODO remove from shared projects as well?
    async function removeFriendVal(oldFriend){
      const newFriends = friendList.slice();
      let ind = friendList.indexOf(oldFriend);
      newFriends.splice(ind,1);
      //console.log(oldFriend, ind);
      setFriendList(newFriends);
      //updateFriendList(newFriends);
      console.log(oldFriend, username);
      auditSharedProjects(oldFriend);
      await fetch('api/friends', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userToRemove: oldFriend, discUser: username})
      });
    }

    async function sendFriendReq() {
        //console.log("do this thing", friendVal);
        console.log(friendVal, username);
        await fetch('/api/friends/reqs/send', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({sendTo: friendVal, fromUser: username}),
          });
        sendReqNotif(friendVal);
        return;
    }

    function sendReqNotif(newFriend){
      if (Notifier){
        Notifier.broadcastEvent(username, Event.RequestSend,{},newFriend);
      } else {
        console.log("no notifier");
      }
    }

    async function auditSharedProjects(oldFriend) {
      await fetch('/api/shared', {
        method: "GET",
      })
        .then((response)=>response.json())
        .then((shared)=>{
          //setFriendList(shared);
          const toRemove = [];
          for (const sh of shared) {
            if (sh.sharedby === oldFriend){
              toRemove.push(sh);
            }
          }
          for (const r of toRemove) {
            deleteSharedProject(username,r.sharedby,r.title);
          }
        });
        await fetch('/api/projects', {
          method: "GET",
        })
          .then((response)=>response.json())
          .then((projects)=>{
            //setFriendList(shared);
            for (const proj of projects) {
              for (const sh of proj.sharedList) {
                if (sh === oldFriend) {
                  removeShareVal(oldFriend, proj, username, projects.slice());
                  //deleteSharedProject(oldFriend, username, proj.title)
                }
              }
            }
          });
    }
  
    async function updateFriendList(newFriends) {
      await fetch('/api/friends', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newFriends),
      });
      /*
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newFriends),
      });
      if (response?.status === 200) {
        console.log("successfully saved connections change");
        localStorage.setItem('friendList', JSON.stringify(newFriends));
        return "success";
      } else {
        const body = await response.json();
        console.log(body.msg);
        return body.msg;
        //setDisplayError(`Error Ocurred: ${body.msg}`);
      }
      //A. P. Eerson,Mr. Frogdatterson,Donna Noble
      */
    }
  
    const friendComps = [];
    if (friendList.length) {
      for (const friend of friendList) {
        friendComps.push(
          <li key={friend} className="list-group-item">
              <div>{friend}</div>
              <button className="btn btn-outline-danger btn-sm" type="submit" onClick={()=>removeFriendVal(friend)}>disconnect</button>
              {/*<button type="submit">see shared projects</button>*/}
          </li>
        );
      }
    }
    friendComps.push(
      <li key="Request:" className="list-group-item">
          <label>Request Connection</label>
          <input type="text" id="find-connection" pattern="\w{1,24}" onChange={(i)=>changeFriendVal(i)} required/>
          <button type="submit" className="btn btn-outline-secondary btn-sm" onClick={()=>sendFriendReq()}>find</button>
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
  

  async function deleteSharedProject(userToRemove, sharedby, title){
    await fetch('/api/shared', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userToRemove: userToRemove, sharedby: sharedby, title: title}),
    });
  }    


  function removeShareVal(shareVal, proj, username, projectList){
    const newShare = proj.sharedList.slice();
    let ind = proj.sharedList.indexOf(shareVal);
    newShare.splice(ind,1);
    updateSharedList(newShare, proj, projectList);
    deleteSharedProject(shareVal, username, proj.title);
  }

  async function updateSharedList(newSharedList, proj, projectList) {
    let project = proj;
    for (const proj of projectList) {
      if (proj.title === project.title) {
        proj.sharedList = newSharedList;
        localStorage.setItem('projects',JSON.stringify(projectList));
        let saveRes = await saveProjectChange(projectList);
        if (saveRes !== "success") {
            console.log(saveRes);
            setMessage(`Could not save, error: ${saveRes}`);
        } else {
            console.log(saveRes);
        }
      }
    }
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

  function getProjectList(){
    let projectListStr = localStorage.getItem('projects');
    let projectList = JSON.parse(projectListStr);
    return projectList;
  }