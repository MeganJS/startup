import React from 'react';
import "./home.css";
import { useState, useEffect } from 'react';
import { Event, Notifier } from '../Notifier';
import FriendList from "./friendList";

export default function FriendReqs(props){
    const username = props.username;
    const [friendreqs, setFriendReqs] = React.useState([]);
    const [friendVal, setFriendVal] = React.useState("__________");
    const [friendList, setFriendList] = React.useState([]);
  
    useEffect(() => {
      fetch('/api/friends/reqs', {
        method: "GET",
      })
        .then((response)=>response.json())
        .then((friends)=>{
          setFriendReqs(friends);
          localStorage.setItem('friendReqs', JSON.stringify(friends));
        });
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
    /*
    async function createNewNotifier(){
      await fetch('/api/userid/mine', {
          method: 'GET',
          //body: JSON.stringify({ username: props.username}),
          //headers: {'Content-type': 'application/json; charset=UTF-8',},
      }).then((response)=>response.json())
      .then((userid)=>{
          console.log(JSON.stringify(userid));
          return new EventNotifier(JSON.stringify(userid));
      });
    }
      */
  
    function addToFriendList(newFriend){
      if (friendList.length){
        for (const friend of friendList) {
          if (friend === newFriend) {
            return;
          }
        }
        const newFriends = friendList.slice();
        newFriends.push(newFriend);
        setFriendList(newFriends);
        //updateFriendList(newFriends);
        addFriendtoDB(newFriend);
        sendFriendNotif(newFriend);
        removeFriendReq(newFriend);
      } else {
        const newFriends = [];
        newFriends.push(newFriend);
        setFriendList(newFriends);
        //updateFriendList(newFriends);
        addFriendtoDB(newFriend);
        Notifier.broadcastEvent(username, Event.RequestAccept, {}, newFriend);

        sendFriendNotif(newFriend);
        removeFriendReq(newFriend);
      }
    }

    async function sendFriendNotif(newFriend){
      //const id = await getOtherUserID(newFriend);
      //console.log(id);
      if (Notifier){
        Notifier.broadcastEvent(username, Event.RequestAccept, {}, newFriend);
      } else {
        console.log("no notifier");
      }
    }
    /*
    async function getOtherUserID(username){
      await fetch('/api/userid', {
          method: 'POST',
          body: JSON.stringify({ username: username}),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then((response)=>{
          console.log(response);
          return response.json();
      })
      .then((userid)=>{
          console.log(userid);
          return userid;
      });
  }
      */

    async function addFriendtoDB(newFriend) {
      await fetch('/api/friends', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userToAdd: newFriend, connUser: username}),
      });
    }
  
    //TODO add modal to prevent unfriending misclicks
    //TODO remove from shared projects as well?
    function removeFriendReq(noReq){
      const newreqs = friendreqs.slice();
      let ind = friendreqs.indexOf(noReq);
      newreqs.splice(ind,1);
      //console.log(oldFriend, ind);
      setFriendReqs(newreqs);
      updateFriendReqs(newreqs);
    }

    async function updateFriendReqs(newReqs) {
        await fetch('/api/friends/reqs', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newReqs),
        });
    }
  
    const friendReqComps = [];
    if (friendreqs.length) {
      for (const friend of friendreqs) {
        friendReqComps.push(
          <li key={friend} className="list-group-item">
              <div>{friend}</div>
              <button className="btn btn-outline-success btn-sm" type="submit" onClick={()=>addToFriendList(friend)}>accept</button>
              <button className="btn btn-outline-danger btn-sm" type="submit" onClick={()=>removeFriendReq(friend)}>decline</button>
          </li>
        );
      }
    }
    /*
    friendComps.push(
      <li key="Request:" className="list-group-item">
          <label>Request Connection</label>
          <input type="text" id="find-connection" pattern="\w{1,24}" onChange={(i)=>changeFriendVal(i)} required/>
          <button type="submit" className="btn btn-outline-secondary btn-sm" onClick={()=>addToFriendList()}>find</button>
      </li>
    );
    */
  
    return (
      <section id="connections">
        <FriendList frList={friendList} username={username}></FriendList>
        <ul className="list-group">
            {friendReqComps}
        </ul>
      </section>
    );
  }
  