import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, Notifier } from '../Notifier';
import { useState, useEffect } from 'react';

export default function Prompts(props) {
    const username = props.username;
    const [response, setResponse] = React.useState("");

    useEffect(()=>{
        if (Notifier){
            Notifier.addHandler(handleEvent);
            return ()=> {
                Notifier.removeHandler(handleEvent);
            };
        }
    });

    function changeResponse(i) {
        setResponse(i.target.value);
        //console.log(cardText);
    }

    function submitResponse(){
        broadcastResponse();
        return;
    }

    async function broadcastResponse(){
        if (Notifier){
          Notifier.broadcastEvent(username, Event.SharePromptRes, {response});
        } else {
          console.log("no notifier");
        }
      }

    //seeSubs may need to be a string
    return (
        <div className="prompt-central">
            <div className="mb-3" id="repsonse-edit">
                <TextAreaAutosize id="textarea-response-edit" minRows={3} maxRows={10} placeholder={response} defaultValue={response} onChange={(i)=>changeResponse(i)}></TextAreaAutosize>
            </div>
            <button onClick={() => submitResponse()}>share your reponse</button>
        </div>
    );
}