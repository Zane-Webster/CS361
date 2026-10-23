const { spawn } = require('child_process');
const path = require('path');

const microservices_paths = [
    "../microservices/receiver.js"
]

function startMicroservices() {
    for (const microservice of microservices_paths) {
        const service_path = path.resolve(__dirname, microservice);
        
        const process = spawn("node", [service_path], {
            stdio: "inherit"
        });

        process.on("error", (error) => {
            console.error(`ERROR: ${microservice}: ${error.message}`);
        });

        console.log(`Starting microservice: ${microservice}`);
    }
}

module.exports = startMicroservices