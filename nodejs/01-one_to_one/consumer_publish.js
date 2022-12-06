var amqp_config = require('./amqp_config')
var amqp_lib = require('amqplib/callback_api');
const log = console.log;

// 连接amqp的地址，创建一个connection对象
amqp_lib.connect(amqp_config.mq_url,(error, connection)=>{
    // create channel
    connection.createChannel((error, channel) => {
        // 定义队列
        let queue = 'test_queue'
        // 明确指定要通信的队列
        channel.assertQueue(queue, {durable: true})
        // 消费者从指定的队列中取出message
        channel.consume(queue, (msg) => {
            setTimeout(() => {
                channel.ack(msg);
                log("[+] receive message from queue -> ", msg.content.toString())
            }, 2000);
        }, {noAck: false})
    })
})
