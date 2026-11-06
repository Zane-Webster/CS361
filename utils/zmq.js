const zmq = require("zeromq");

const microservices = new Map();

microservices.set("statistics", 5559);

async function sendRequest(data, microservice) {
    const socket = new zmq.Request();

    try {
        socket.connect(`tcp://localhost:${microservices.get(microservice)}`);

        await socket.send(JSON.stringify(data));

        const [response] = await socket.receive();

        return JSON.parse(response.toString());
    } finally {
        socket.close();
    }
}

module.exports = sendRequest;