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
    
    constructor(userID) {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?userid=${userID}`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('idea-thing', Event.System, {msg: 'connected'}, ""));
        }
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('idea-thing', Event.System, {msg: 'disconnected'}, ""));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value, to){
        const event = new EventMessage(from, type, value, to);
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


const Notifier =  createNewEventNotifier();
function createNewEventNotifier(){
    fetch('/api/userid/mine', {
        method: "GET",
    })
    .then((response)=>response.json())
    .then((userid)=>{
        console.log(userid);
        return new EventNotifier(userid);
    });
}

export { Event, Notifier };