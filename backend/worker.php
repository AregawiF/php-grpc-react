<?php


use Ping\PingServiceInterface;
use Spiral\Goridge\StreamRelay;
use Spiral\GRPC\Server;
use Spiral\RoadRunner\Worker;

require __DIR__ . '/vendor/autoload.php';

$server = new Server(null, [
    'debug' => false, 
]);

$server->registerService(PingServiceInterface::class, new PingService());

$worker = \method_exists(Worker::class, 'create')
    // RoadRunner >= 2.x
    ? Worker::create()
    // RoadRunner 1.x
    : new Worker(new StreamRelay(STDIN, STDOUT))
;

$server->serve($worker);