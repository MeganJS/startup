import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, Notifier } from '../Notifier';
import { useState, useEffect } from 'react';

export default function AccountNotifs(props) {
    //const notifier = createNewNotifier();
    const [events, setEvent] = React.useState([]);
    const [seeSubs, setSeeSubs] = React.useState(false);

    useEffect(()=>{
        if (Notifier){
            Notifier.addHandler(handleEvent);
            return ()=> {
                Notifier.removeHandler(handleEvent);
            };
        }
    });

    function showOrHide() {
        if (seeSubs){
            setSeeSubs(false);
            return;
        }
        setSeeSubs(true);
    }

    function handleEvent(event){
        setEvent([...events,event]);
    }

    function createNotifs() {
        const notifs = [];
        for (const [i,event] of events.entries()) {
            let notif = 'unknown';
            if (event.type === Event.SharePromptRes) {
                notif = `${event.from}: ${event.value}`;
            }
            /*
            if (event.type === Event.RequestSend){
                notif = `${event.from} sent a request to connect`;
            } else if (event.type === Event.RequestAccept) {
                notif = `${event.from} accepted your connection request`;
            } else if (event.type === Event.ProjectShare) {
                notif = `${event.from} shared ${event.value.title} with you`;
            }
                */
            notifs.push(<div key={i} className='submission'>
                {notif}
            </div>);
        }
        return notifs;
    }
    //seeSubs may need to be a string
    return (
        <div className="submission-central">
            <button onClick={() => showOrHide()}>see what people have written</button>
            <div hidden={seeSubs} className="submissions">
                {createNotifs()}
            </div>
        </div>
    );
}