const Event = {
    RequestSend: 'requestSend',
    RequestAccept: 'requestAccept',
    ProjectShare: 'projectShare',
    ProjectUpdate: 'projectUpdate'
}

class EventMessage {
    constructor(from, type, value) {
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
    }
}