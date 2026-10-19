const zmq = require("zeromq");

async function start() {
    const socket = new zmq.Reply();

    await socket.bind("tcp://127.0.0.1:5555");

    console.log("Microservice waiting for messages...");

    for await (const [message] of socket) {
        const text = message.toString();

        console.log("Received:", text);

        await socket.send("Message received");
    }
}

start().catch(console.error);
