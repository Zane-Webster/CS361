const zmq = require("zeromq");

const PORT = 5555;

async function start() {
    const socket = new zmq.Reply();

    await socket.bind(`tcp://127.0.0.1:${PORT}`);

    console.log(`Receiver started at port ${PORT}...`);

    for await (const [message] of socket) {
        const text = message.toString();

        console.log("Received:", text);

        const response = JSON.stringify("Message received")

        await socket.send(response);
    }
}

start().catch(console.error);