
var amqp_config = require('./amqp_config')
var amqp_lib = require('amqplib/callback_api');
const log = console.log


// 连接amqp的地址，创建一个connection对象
amqp_lib.connect(amqp_config.mq_url,(error, connection)=>{
    // create channel
    connection.createChannel((error, channel) => {
        // 定义队列
        let queue = 'test_queue'
        let msg = "hello world"
        // 明确指定要通信的队列
        channel.assertQueue(queue, {durable: true})
        // 发送到指定队列任务，并且属性是消息持久化
        channel.sendToQueue(queue, Buffer.from(msg), {persistent: true})
        log("send message to queue...")
    })
})
