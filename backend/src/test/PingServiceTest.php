<?php

use PHPUnit\Framework\TestCase;
use Spiral\GRPC\ContextInterface;
use Ping\PingRequest;
use Ping\PingResponse;


class PingServiceTest extends TestCase
{
    public function testPingEchoesMessage()
    {
        // Instantiate the service under test.
        $service = new PingService();

        // Create a dummy ContextInterface (we don't need real behavior for this test).
        $context = $this->createMock(ContextInterface::class);

        // Create a PingRequest and set a sample message.
        $request = new PingRequest();
        $expectedMessage = "Hello, World!";
        $request->setMessage($expectedMessage);

        // Call the service method.
        $response = $service->Ping($context, $request);

        // Verify that the response is a PingResponse instance.
        $this->assertInstanceOf(PingResponse::class, $response);

        // Assert that the response message matches the input.
        $this->assertEquals($expectedMessage, $response->getMessage());
    }
}
