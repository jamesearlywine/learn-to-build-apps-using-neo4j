// https://stackoverflow.com/questions/23258421/how-to-stop-app-that-node-js-express-npm-start
const io = require('socket.io-client');
const socketClient = io.connect('http://localhost:3000'); // Specify port if your express server is not using default port 80

socketClient.on('connect', () => {
  socketClient.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 100);
});