##################################################
#
#   Statistics Microservice
#
#   Port 5559
#
#   SEND {data, operation, field}:
#       data: Send full JSON data
#       operation: "average",                                            # TODO: Update operations list here
#       field: Which JSON field to apply the operation to. By default
#              this will only look at the fields on the surface level.
#              You can use dots to look deeper into the fields like 
#              directories (ex. you can enter `match.performence.kills`
#              to go deeper into those fields)
#
##################################################

import zmq, json

PORT = 5559

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(f'tcp://*:{PORT}')

print(f'Listening on port {PORT}... (Ctrl+C to terminate)')

# TODO: Update operations list here
OPERATIONS = ["average"]

####################
#
# FUNCTIONS
#
####################

def get_nested_value(item, field):
    # Traverse each field separated by dots
    # If there are no dots, access the top-level field
    for key in field.split("."):
        item = item[key]

    return item

def verify_req(req):
    # Verify request is a JSON object
    if not isinstance(req, dict):
        return "Request must be a JSON object"

    # Verify required keys exist
    if not all(key in req for key in ("data", "operation", "field")):
        return "Missing required fields"

    # Pull arguments from request
    data = req["data"]
    operation = req["operation"]
    field = req["field"]

    # Verify argument types
    if not isinstance(data, list):
        return "Data must be an array"

    if not isinstance(operation, str) or not isinstance(field, str):
        return "Operation and field must be strings"

    # Verify data is not empty
    if not data:
        return "Data cannot be empty"

    # Verify nested fields exist and are numeric
    try:
        for item in data:
            # Get nested value if using dot notation
            value = get_nested_value(item, field)

            if type(value) not in (int, float):
                return "Field values must be numeric"

    except (KeyError, TypeError):
        return "Invalid data structure or missing field"

    # Verify operation is available
    if operation not in OPERATIONS:
        # TODO: Update operations list here
        return "Operation must be exactly one of: average"

    return None

####################
#
# MAIN LOOP
#
####################

while True:
    # Receieve request
    raw_req = socket.recv()

    # Try to load, verify and process it
    try:    
        req = json.loads(raw_req)

        verification_error = verify_req(req)

        if verification_error:
            response = {"error": verification_error}
        else:
            # Pull arguments from request
            data = req["data"]
            operation = req["operation"]
            field = req["field"]

            # Get values from the field in data
            values = [get_nested_value(item, field) for item in data]

            result = 0

            # TODO: Add more operations here
            # Remember to add operations to the lists above. They are all marked with `TODO:` if you Ctrl+F
            if operation == "average":
                result = sum(values) / len(values)

            response = {"result": result}

    # Should rarely occur
    except (KeyError, TypeError, ValueError, ZeroDivisionError) as e:
        response = {"error": str(e)}

    # Send response
    socket.send_json(response)