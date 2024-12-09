import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event, Notifier } from '../Notifier';
import { useState, useEffect } from 'react';



export default function AccountNotifs(props) {
    //const notifier = createNewNotifier();
    const [events, setEvent] = React.useState(["f"]);

    useEffect(()=>{
        if (Notifier){
            Notifier.addHandler(handleEvent);
            return ()=> {
                Notifier.removeHandler(handleEvent);
            };
        }
    });
    /*
    function createNewNotifier(){
        fetch('/api/userid/mine', {
            method: "GET",
        })
        .then((response)=>response.json())
        .then((userid)=>{
            console.log(JSON.stringify(userid.id));
            return new EventNotifier(JSON.stringify(userid.id));
        });
    }
        */

    function handleEvent(event){
        setEvent([...events,event]);
    }

    function createNotifs() {
        const notifs = [];
        for (const [i,event] of events.entries()) {
            let notif = 'unknown';
            if (event.type === Event.RequestSend){
                notif = `${event.from} sent a request to connect`;
            } else if (event.type === Event.RequestAccept) {
                notif = `${event.from} accepted your connection request`;
            } else if (event.type === Event.ProjectShare) {
                notif = `${event.from} shared ${event.value.title} with you`;
            }
            notifs.push(<div key={i} className='event'>
                {notif}
            </div>);
        }
        return notifs;
    }

    return (
        <div className="notifications">
            {createNotifs()}
        </div>
    );
}