const Event = {
    System: 'system',
    RequestSend: 'requestSend',
    RequestAccept: 'requestAccept',
    ProjectShare: 'projectShare',
    ProjectUpdate: 'projectUpdate',
    SharePrompt: 'sharePrompt',
    SharePromptRes: 'sharePromptRes'
}

class EventMessage {
    constructor(from, type, value, to) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class EventNotifier {
    events = [];
    handlers = [];
    
    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        //this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws?userid=${userid}`);
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
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
                console.log("msg recieved");
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(from, type, value){
        //console.log(to);
        //const id = getOtherUserID(to);
        //console.log(id);
        const event = new EventMessage(from, type, value);
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


const Notifier =  new EventNotifier();

export { Event, Notifier };