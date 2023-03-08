` URL designs`

## Tasks

    # Create task

    POST /tasks/createTask => Example: POST /tasks/createTask
    Response status code: 200 OK | 400 BAD REQUEST
    Recives:
        {
            "title": "string",
            "completed": boolean,
            "description": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "Task added"
        }

    Error response schema:
        {
            "error": true,
            "message": "List doesnt exists",
            "status": 404
        }
    or
        {
            "error": true,
            "message": "Task already exists",
            "status": 400
        }

    # Update task

    PUT /tasks/updateTask => Example: PUT /tasks/updateTask
    Response status code: 200 OK | 404 NOT FOUND
    Recives:
        {
            "title": "string",
            "completed": boolean,
            "description": "string",
            "newDescription": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "Task succesfully updated"
        }

    Error response schema:
        {
            "error": true,
            "message": "Cant update that task",
            "status": 400
        }
    or
        {
            "error": true,
            "message": "Task doesnt exists",
            "status": 404
        }

     # Delete task

    DELETE /tasks/deleteTask => Example: DELETE /tasks/deleteTask
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "title": "string",
            "completed": boolean,
            "description": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "Task succesfully deleted"
        }

    Error response schema:
        {
            "error": true,
            "message": "Cant delete that task",
            "status": 400
        }
    or
        {
            "error": true,
            "message": "Task doesnt exists",
            "status": 404
        }

     # Update complte state

    PUT /tasks/completeOrDecompleteTask => Example: PUT /tasks/completeOrDecompleteTask
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "title": "string",
            "completed": boolean,
            "description": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "Task completed state updated"
        }

    Error response schema:
        {
            "error": true,
            "message": "Can't update that task",
            "status": 400
        }
    or
        {
            "error": true,
            "message": "Task doesnt exists",
            "status": 404
        }

## Lists

    # Get username lists

    GET /lists/getUserLists?username=value => Example: GET /lists/getUserLists?username=lucas

    Success response schema:
        {
        "status": 200,
        "data": [
            {
                "user": {
                    "username": "lucascurtoo2"
                },
                "title": "My List",
                "todo": [],
            }
            ...
            ]
        }

    Error response schema:
        {
            "error": true,
            "message": "User doesnt exists",
            "status": 404
        }
    or
        {
            "error": true,
            "message": "User doesnt have lists",
            "status": 400
        }

    # Create list

    POST /lists/createList => Example: POST /lists/createList
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "title": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "List created"
        }

    Error response schema:
        {
            "error": true,
            "message": "List already exists",
            "status": 400
        }

    # Delete list

    DELETE /lists/deleteList => Example: DELETE /lists/deleteList
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "title": "string",
            "username": "string"
        }

    Success response schema:
        {
            "status": 200,
            "message": "List deleted"
        }

    Error response schema:
        {
            "error": true,
            "message": "List doesnt exists",
            "status": 404
        }

## Authentication

     # Login

    POST /auth/login => Example: POST /auth/login
    Response status code: 200 OK | 404 NOT FOUND | 401 UNAUTHORIZED | 400 BAD REQUEST
    Recives:
        {
            "username": "string",
            "password": "string"
        }
    Success response schema:

        {
            "error": null,
            "status": 200,
            "data": {jwt-token}
        }

    Error response schema:
        {
            "error": true,
            "message": "User not found",
            "status": 404
        }
    or
        {
            "error": true,
            "message": "Incorrect password",
            "status": 401
        }

    # Register

    POST /auth/register => Example: POST /auth/register
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "username": "string",
            "password": "string"
        }
    Success response schema:

        {
            "error": null,
            "status": 200,
            "data": {jwt-token}
        }

    Error response schema:
        {
            "error": true,
            "message": "Username already taken",
            "status": 400
        }

## Users

    # Get user dark mode

    GET /users/getUserDarkMode => Example: GET /users/getUserDarkMode
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Success response schema:

        {
            "status": 200,
            "data": {darkmode: true}
        }

    Error response schema:
        {
            "error": true,
            "message": "User does'nt exist",
            "status": 404
        }


    # Update user dark mode


    PUT /users/updateUserDarkMode => Example: PUT /users/updateUserDarkMode
    Response status code: 200 OK | 404 NOT FOUND | 400 BAD REQUEST
    Recives:
        {
            "username": "string",
            "darkmode": "string"
        }
    Success response schema:

        {
            "status": 200,
            "message": "DarkMode updated"
        }

    Error response schema:
        {
            "error": true,
            "message": "Cant update the user darkMode",
            "status": 500
        }
