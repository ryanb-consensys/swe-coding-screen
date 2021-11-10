const createServer = require("./server");

const DEFAULT_PORT = 3000;
const { PORT = DEFAULT_PORT } = process.env;

const app = createServer();
app.listen(PORT, () => console.log(`API server is listening on port ${PORT}`));
