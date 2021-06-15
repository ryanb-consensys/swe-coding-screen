const createServer = require("./server");

const { PORT } = process.env;
const DEFAULT_PORT = 3000;

const app = createServer();
app.listen(PORT || DEFAULT_PORT, () => console.log(`API server is listening on port ${PORT}`));
