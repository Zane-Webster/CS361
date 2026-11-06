const { spawn } = require('child_process');
const path = require('path');

const microservices_paths = [
    "../microservices/statistics.py"
]

function startMicroservices() {
    for (const microservice of microservices_paths) {
        const service_path = path.resolve(__dirname, microservice);
        
        const process = spawn("python", [service_path], {
            stdio: "inherit"
        });

        process.on("error", (error) => {
            console.error(`ERROR: ${microservice}: ${error.message}`);
        });

        console.log(`Starting microservice: ${microservice}`);
    }
}

module.exports = startMicroservices