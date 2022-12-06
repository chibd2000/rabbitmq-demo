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
    // 路由 -> direct_logs
    var exchange = 'direct_logs';
    var args = process.argv.slice(2);
    var msg = 'Hello World!';
    // var severity = (args.length > 0) ? args[0] : 'info';

    channel.assertExchange(exchange, 'direct', {durable: false});

    var severity;
    setInterval(() => {
        severity = args[parseInt(Math.random()*3)];
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    }, 500);
    
  });
});