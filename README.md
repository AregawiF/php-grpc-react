# a simple application php backend grpc react frontend

This project demonstrates a simple gRPC setup with a React frontend and a PHP backend using RoadRunner.  Envoy acts as a proxy to enable gRPC-Web communication between the browser and the server. The application sends a message from the frontend to the backend via gRPC and displays the echoed response.


## Prerequisites

*   **PHP:**  >= 8.1 (with necessary extensions like `ext-grpc`, `ext-protobuf`)
*   **Composer:**  For managing PHP dependencies.
*   **RoadRunner:**  `rr` executable (install globally or use a local binary).
*   **Node.js:** >= 18 (with npm or yarn)
*   **Envoy:**  Install the `envoy` executable.
*   **protoc** >= 3
*   **grpc-tools and grpc-web:**


## Setup and Running

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AregawiF/php-grpc-react.git
    cd php-grpc-react
    ```

2.  **Generate gRPC Code (JavaScript and PHP):**

    First, ensure you have `protoc`, `protoc-gen-php-grpc`, and `grpc-web` installed.  You can check with `protoc --version`.

    *   **PHP (Backend):** The PHP gRPC code may already be generated. If you need to regenerate it, run the following command from the project root:

        ```bash
        protoc --plugin=protoc-gen-grpc=$(which protoc-gen-php-grpc) \        
                --php_out=src/Grpc \
                --php-grpc_out=src/Grpc \
                -Iproto proto/ping.proto

        ```

    *   **JavaScript (Frontend):** From the project root:

        ```bash
        protoc -I=src/proto src/proto/ping.proto \
          --js_out=import_style=es6,binary:src/proto \
          --grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/proto
        ```

3.  **Install Dependencies:**

    *   **Backend (PHP):**
        ```bash
        cd backend
        composer install
        ```

    *   **Frontend (React):**
        ```bash
        cd ../frontend
        npm install  
        ```

4.  **Running the Application:**

    *   **Backend (PHP - RoadRunner):**  From the `backend` directory:
        ```bash
        rr-grpc serve -v -d
        ```

    *   **Envoy Proxy:**  From the project *root* directory (where `envoy.yaml` is located):
        ```bash
        envoy -c envoy.yaml
        ```
		 Note: If you encounter permission issues, ensure no other envoy processes are already running.

    *   **Frontend (React - Vite):** From the `frontend` directory:
        ```bash
        npm run dev  
        ```

5.  **Access the Application:**

    Open your browser and go to `http://localhost:5173` (or the port Vite indicates). Enter a message in the input field and click "Send". The message will be sent to the PHP gRPC server via Envoy, and the echoed response will be displayed.

## Testing

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
