import amqp, { Connection } from "amqplib/callback_api";

const createMQProducer = (
  amqpUrl: string,
  queueName: string
): ((msg: string) => void) => {
  console.log("Connecting to RabbitMQ...");
  let ch: any;
  amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      throw new Error("Error connecting to RabbitMQ: " + errorConnect);
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log("Error creating channel: ", errorChannel);
        return;
      }

      ch = channel;
      console.log("Connected to RabbitMQ");
    });
  });
  return (msg: string) => {
    console.log("Produce message to RabbitMQ...");
    ch.sendToQueue(queueName, Buffer.from(msg));
  };
};

export default createMQProducer;
