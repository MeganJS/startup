import React from 'react';
import { Event, Notifier } from '../Notifier';
import { useState, useEffect } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';


export default function Prompt(props) {
    const username = props.username;
    const [response, setResponse] = React.useState("");

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
                <p id="prompt"><b>Today's Prompt: Walking through the woods alone, you spot an oddly shaped 
                    lamp on the ground. What happens when you pick it up?</b></p>
                <TextAreaAutosize id="textarea-response-edit" minRows={3} maxRows={10} placeholder={response} defaultValue={response} onChange={(i)=>changeResponse(i)}></TextAreaAutosize>
            </div>
            <button onClick={() => submitResponse()}>share your reponse</button>
        </div>
    );
}