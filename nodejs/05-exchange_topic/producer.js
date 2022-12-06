var amqp = require('amqplib/callback_api');
const { checkServerIdentity } = require('tls');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    
    var exchange = 'my_topic';
    var msg = 'Hello World!';
    channel.assertExchange(exchange, 'topic', {durable: false});

    send_array = ['quick.orange.rabbit', 'quick.orange.fox', 'lazy.pink.rabbit', 'quick.brown.fox']
    send_array.forEach(element => {
      setTimeout(() => {
        channel.publish(exchange, element, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", element, msg);
      }, 1000);
    });
  });
});
