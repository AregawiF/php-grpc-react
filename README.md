# Simple message echo application php backend grpc react frontend

This project demonstrates a simple gRPC setup with a React frontend and a PHP backend using RoadRunner.  Envoy acts as a proxy to enable gRPC-Web communication between the browser and the server. The application sends a message from the frontend to the backend via gRPC and displays the echoed response.


## Setup and Running

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AregawiF/php-grpc-react.git
    cd php-grpc-react
    ```

2.  **Running the Application:**
**Run the docker network containing the backend, envoy and frontend services**

    ```bash
    docker compose up --build
    ```

5.  **Access the Application:**

    Open your browser and go to `http://localhost:5173` (or the port Vite indicates). Enter a message in the input field and click "Send". The message will be sent to the PHP gRPC server via Envoy, and the echoed response will be displayed.

## Testing

    after getting inside the docker 

*   **Backend (PHP):** From the `backend` directory:

    ```bash
    ./vendor/bin/phpunit src/test/PingServiceTest.php
    ```

*   **Frontend (React):** From the `frontend` directory:

    ```bash
    npx jest
    ```

## Notes

*   This example uses Envoy as a proxy for gRPC-Web.  This is the recommended approach for production deployments.
*   The frontend uses Vite for development and building.
*   The backend uses RoadRunner to manage PHP workers and handle gRPC requests.
*   CORS is handled by Envoy.
