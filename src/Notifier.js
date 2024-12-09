const Event = {
    System: 'system',
    RequestSend: 'requestSend',
    RequestAccept: 'requestAccept',
    ProjectShare: 'projectShare',
    ProjectUpdate: 'projectUpdate'
}

class EventMessage {
    constructor(from, type, value, to) {
        this.from = from;
        this.type = type;
        this.value = value;
        this.to = to
    }
}

class EventNotifier {
    events = [];
    handlers = [];
    
    constructor(username) {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        //this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?userid=${userid}`);
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?username=${username}`);
        /*
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('idea-thing', Event.System, {msg: 'connected'}, ""));
        }
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('idea-thing', Event.System, {msg: 'disconnected'}, ""));
        }
            */
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value, to){
        //console.log(to);
        //const id = getOtherUserID(to);
        //console.log(id);
        const event = new EventMessage(from, type, value, to);
        console.log(type);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler){
        this.handlers.push(handler);
    }

    removeHandler(handler){
        this.handlers.filter((h)=> h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e)=> {
            this.handlers.forEach((handler)=>{
                handler(e);
            });
        });
    }
}


const Notifier =  new EventNotifier(getUserName());
function getUserName(){
    fetch('/api/username', {
        method: "GET",
    })
    .then((response)=>response.json())
    .then((username)=>{
        console.log(username);
        return username;
    });
}
/*
function getUserID(){
    fetch('/api/userid', {
        method: "GET",
    })
    .then((response)=>response.json())
    .then((userid)=>{
        console.log(userid);
        return userid;
    });
}
    */
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
export { Event, Notifier };