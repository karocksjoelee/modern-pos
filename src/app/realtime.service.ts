import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as socketio from 'socket.io-client';

export class RealTimeService {

    private url = 'http://localhost:7500';
    private socket;

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    getMessages() {

        const observable = new Observable((observer) => {
            this.socket = socketio(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });

        return observable;
    }

}
