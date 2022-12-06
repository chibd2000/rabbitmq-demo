var amqp_config = require('./amqp_config');
var amqp_lib = require('amqplib/callback_api');
const log = console.log;

// 连接amqp的地址，创建一个connection对象
amqp_lib.connect(amqp_config.mq_url,(error, connection)=>{
    // create channel
    connection.createChannel((error, channel) => {
        // 设置路由名称
        let exchange = 'logs';
        // 选择路由
        channel.assertExchange(exchange, 'fanout', {durable: false});
        // 创建未命名队列
        channel.assertQueue('', {exclusive: true}, function(error, q){
            // 设置公平遣派
            channel.prefetch(1)
            // 需要告诉交换器将消息发送到我们的队列
            channel.bindQueue(q.queue, exchange, '')
            // 消费者从指定的队列中取出message
            channel.consume(q.queue, (msg) => {
                setTimeout(() => {
                    if(msg.content){
                        log("[+] receive message from ", q.queue.toString(), " -> ", msg.content.toString())   
                    }
                }, 1000);
            }, {noAck: true})
        })
    })
})
