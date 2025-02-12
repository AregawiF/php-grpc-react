import React, { useState, useEffect } from 'react';

import * as grpcWeb from 'grpc-web';

import * as pingProto from './proto/ping_pb';
import * as pingServiceClientProto from './proto/PingServiceClientPb';



function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [client, setClient] = useState(null); // Store the gRPC client
  const [error, setError] = useState(null); // Store any errors

  // Initialize the gRPC client when the component mounts
  useEffect(() => {
    const newClient = new pingServiceClientProto.PingServiceClient('http://localhost:8080'); 
    setClient(newClient);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setResponse(''); // Clear previous response

    if (!client) {
      setError('gRPC client not initialized.');
      return;
    }

    if (!message.trim()) { 
        setError("Please enter a message.");
        return;
    }

    const request = new pingProto.PingRequest();
    request.setMessage(message);

    try {
      client.ping(request, {}, (err, grpcResponse) => {
        if (err) {
          setError(`gRPC Error: ${err.message}`);
          console.error('gRPC Error:', err); 
        } else {
          setResponse(grpcResponse.getMessage());
        }
      });
    } catch (error) {
      setError(`Error making gRPC request: ${error.message}`);
      console.error('Error making gRPC request:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">gRPC Client</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your message"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
        {response && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            Response: {response}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;