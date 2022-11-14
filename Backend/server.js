const http = require("http");
const app = require("./app");
const cors = require("cors");

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server listening on Port: ${port}`);
});
