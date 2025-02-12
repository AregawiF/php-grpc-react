import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as pingServiceClientProto from '../proto/PingServiceClientPb';
import * as pingProto from '../proto/ping_pb';

// --- Mocks for gRPC generated code --- //
jest.mock('../proto/PingServiceClientPb', () => {
  return {
    PingServiceClient: jest.fn(),
  };
});

jest.mock('../proto/ping_pb', () => {
  return {
    PingRequest: jest.fn().mockImplementation(() => {
      let message = '';
      return {
        setMessage: (msg) => { message = msg; },
        getMessage: () => message,
      };
    }),
  };
});

describe('App Component', () => {
  let pingMock;

  beforeEach(() => {
    // Create a mock implementation for the ping method.
    pingMock = jest.fn();
    // When the component instantiates the client in useEffect,
    // it will receive an object whose ping method is our mock.
    pingServiceClientProto.PingServiceClient.mockImplementation(() => ({
      ping: pingMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits a successful gRPC request and displays the response', async () => {
    // Simulate a successful gRPC response by invoking the callback with no error.
    pingMock.mockImplementation((request, metadata, callback) => {
      callback(null, { getMessage: () => 'Echo: Hello, gRPC!' });
    });

    render(<App />);

    // Find the input and type a message.
    const input = screen.getByPlaceholderText('Enter your message');
    fireEvent.change(input, { target: { value: 'Hello, gRPC!' } });

    // Click the send button.
    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);

    // Wait until the response text appears.
    await waitFor(() =>
      expect(screen.getByText(/Response: Echo: Hello, gRPC!/)).toBeInTheDocument()
    );

    // Confirm that no error is shown.
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  test('displays an error when submitting an empty message', async () => {
    render(<App />);

    // Click the send button without typing a message.
    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);

    // The error message for an empty message should appear.
    await waitFor(() =>
      expect(screen.getByText(/Please enter a message\./)).toBeInTheDocument()
    );
  });

  test('displays an error when gRPC call fails', async () => {
    // Simulate an error in the gRPC call.
    pingMock.mockImplementation((request, metadata, callback) => {
      callback({ message: 'gRPC connection error' }, null);
    });

    render(<App />);

    // Type a valid message.
    const input = screen.getByPlaceholderText('Enter your message');
    fireEvent.change(input, { target: { value: 'Test message' } });

    // Submit the form.
    const button = screen.getByRole('button', { name: /send/i });
    fireEvent.click(button);

    // Wait until the error message is displayed.
    await waitFor(() =>
      expect(screen.getByText(/gRPC Error: gRPC connection error/)).toBeInTheDocument()
    );
  });
});
