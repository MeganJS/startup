import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import TextAreaAutosize from 'react-textarea-autosize';
import "../card/card.css";


{/*TODO ask TAs about how to do textbox*/}
{/*TODO let user choose image*/}
export function CardEdit(props) {
    const username = props.username;
    const card = getCardInfo();
    if (card.text === "") {
        card.text = "enter details here";
    }
    const [cardType, setType] = React.useState(card.type);
    const [cardImage, setImage] = React.useState(card.image);
    const [cardTitle, setTitle] = React.useState(card.title);
    const [cardText, setText] = React.useState(card.text);
    const [message,setMessage] = React.useState("");


    function changeTitle(i) {
        setTitle(i.target.value);
        //(cardTitle);
    }
    
    function changeType(newType) {
        setType(newType);
        //console.log(cardType);
    }

    function changeText(i) {
        setText(i.target.value);
        //console.log(cardText);
    }

    async function saveInfo() {
        let projectList = getProjectList();
        let project = getCurProject();
        let card = getCardInfo();
        let cProject = { ...project }
        for (const pCard of cProject.cardList) {
            if (pCard.title === cardTitle) {
                if (cardTitle !== card.title){
                    setMessage("card title must be distinct from other cards");
                }
            }
        }

        for (const proj of projectList) {
            if (proj.title === cProject.title) {
                for (const pCard of proj.cardList) {
                    if (pCard.title === card.title) {
                        pCard.title = cardTitle;
                        pCard.type = cardType;
                        pCard.image = cardImage;
                        pCard.text = cardText;
                        localStorage.setItem('currentCard',JSON.stringify(pCard));
                    }
                }
              localStorage.setItem("currentProject",JSON.stringify(proj));
              sendSavedProj(proj.title, proj);
            }
        }
        localStorage.setItem('projects',JSON.stringify(projectList));
        let saveRes = await saveProjectChange(projectList);
        if (saveRes !== "success") {
            console.log(saveRes);
            setMessage(`Could not save, error: ${saveRes}`);
        } else {
            setMessage("");
            console.log(saveRes);
        }
    }

    async function sendSavedProj(oldTitle, project){
        const shared = project.sharedList;
        const shProject = {
            title: project.title,
            sharedby: props.username,
            cardList: project.cardList
        }
        for (const sh of shared) {
          //console.log(sh);
          await fetch('/api/shared', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({userToUpdate: sh, title: oldTitle, sharedby: username, shProject: shProject}),
          });
        }
    }
  return (
    <main>
        <section id="card-data">
            <button type="submit" className="btn btn-secondary btn-sm">
                <NavLink className='nav-link' to='/card' onClick={()=>saveInfo()}>save and return</NavLink>
            </button>

            <div className="dropdown">
                Card Type:
                <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {cardType}
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={(i)=>changeType("Character")}>Character</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(i)=>changeType("Item")}>Item</a></li>
                    <li><a className="dropdown-item" href="#"onClick={(i)=>changeType("Setting")}>Setting</a></li>
                </ul>
            </div>
            <div id="card-image">
                <img alt="card-image" src={cardImage} />
            </div>
            <div>
                <input type="text" id="card-name" name="card-name" defaultValue={cardTitle} onChange={(i)=>changeTitle(i)} />
                <div>{message}</div>
            </div>


            {/*
            <div id="card-tags">
                <b>tags:</b>
                <ul className="list-group" id="tag-list">
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        Samosed Maat
                        <button type="submit">x</button>
                    </li>
                            
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        Tree Place Hollow Ground Sea
                        <button type="submit">x</button>
                    </li>
                    <li className="list-group-item" style="max-height: 50px; padding: 4px">
                        The Evil Overlords - musical piece
                        <button type="submit">x</button>
                    </li>
                    <li className="list-group-item" id="add-tag" style="display:inline; padding: 4px;">
                        <p>Add:</p>
                        <div className="dropdown">
                            <a className="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ____________
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Button of Doom</a></li>
                                <li><a className="dropdown-item" href="#">The Arctic Sea</a></li>
                            </ul>
                            <button type="submit" style="display:inline;">submit</button>
                            </div>
                    </li>
                </ul>
            </div>
            */}
        </section>

        <section>
            <div className="mb-3" id="card-text-edit">
                <TextAreaAutosize id="textarea-card-edit" minRows={3} maxRows={20} placeholder={cardText} defaultValue={cardText} onChange={(i)=>changeText(i)}></TextAreaAutosize>
            </div>
            <button type="submit" className="btn btn-primary btn-sm" onClick={()=>saveInfo()}>
                save and continue
            </button>
        </section>
    </main>
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

function getCardInfo(){
    const cardStr = localStorage.getItem('currentCard');
    const cardObject = JSON.parse(cardStr);
  
    {/*
    const cardObj = {
      cType: "Character",
      cImage: `dolphin.png`,
      cTitle: "Agent Squeaker",
      cText: "Agent Squeaker started training very young - as a jazz musician. Now that the music club cabal have swept that career off the deck, she's joined up with the task force bent on taking them down - with the help of some friends... "
    };
    return cardObj;
    */}
    return cardObject;
  }