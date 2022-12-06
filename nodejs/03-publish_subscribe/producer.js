
var amqp_config = require('./amqp_config')
var amqp_lib = require('amqplib/callback_api');
const log = console.log


// 连接amqp的地址，创建一个connection对象
amqp_lib.connect(amqp_config.mq_url,(error, connection)=>{
    // create channel
    connection.createChannel((error, channel) => {
        let msg = "hello world"
        let exchange = "logs"
        
        // 生产一个非持久的未命名的队列
        channel.assertQueue('', {exclusive: true});
        
        // 指定路由类型fanout，将收到的所有消息广播到它知道的所有队列
        channel.assertExchange(exchange, 'fanout', {durable: false});

        // 执行publish
        setInterval(() => {
            channel.publish(exchange, '', Buffer.from(msg)); // 路由为fanout的时候默认忽略routing key
            log("[+] send message to queue -> ", msg)
        }, 2000);
    })
})
