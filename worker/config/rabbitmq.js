module.exports = {
  url: "amqp://rabbitmq:5672",
  exchangeName: "serverExchange",
  queueName: "worker-queue",
  bindingKey: "worker",
};
