const http = require('http');
const app = require('./app');
const cors = require('cors');

app.use(cors());

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server běží na portu ${port}`);
});