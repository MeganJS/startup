import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event,EventNotifier } from '../Notifier';



export default function AccountNotifs(props) {
    const notifier = props.notifier;
    const [events, setEvent] = React.useState([]);

    React.useEffect(()=>{
        notifier.addHandler(handleEvent);
        return ()=> {
            notifier.removeHandler(handleEvent);
        };
    });

    function handleEvent(event){
        setEvent([...events,event]);
    }

    function createNotifs() {
        const notifs = [];
        for (const [i,event] of events.entries()) {
            let notif = 'unknown';
            if (event.type === Event.RequestSend){
                notif = `${event.value.from} sent a request to connect`;
            } else if (event.type === Event.RequestAccept) {
                notif = `${event.value.from} accepted your connection request`;
            } else if (event.type === Event.ProjectShare) {
                notif = `${event.value.from} shared ${event.value.title} with you`;
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