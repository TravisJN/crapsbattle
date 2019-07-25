import io from 'socket.io-client';
const connection = io('http://localhost:8080');

export class Connection {
  private static url = 'ws://localhost:8080';
  private mIsConnected: boolean = false;
  private mPromise;
  private mResolve;

  constructor() {
    connection.on('connect', () => {
      console.log('connection to server established');
    });

    connection.on('disconnect', () => {
      console.log('disconnect: connection no longer connected');
      this.mIsConnected = false;
    });

    connection.on('joined', (data) => {
      console.log('Successfully joined a game!');
      this.mIsConnected = true;
      console.log(this.mPromise);
      this.mPromise.then();
    });

    connection.on('ready', () => {

    });
  }

  public get isConnected() {
    return this.mIsConnected;
  }

  public joinGame() {
    console.log('joining game...');


    this.mPromise = new Promise((resolve, reject) => {
      this.mResolve = resolve;
      connection.emit('join', 'travis');
    });

    return this.mPromise;
  }
}
