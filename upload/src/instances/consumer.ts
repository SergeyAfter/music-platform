import amqp, { Message } from "amqplib/callback_api";
import { upload } from "../controlers/s3Controller";

const createMQConsumer = (amqpURl: string, queueName: string) => {
  console.log("Connecting to RabbitMQ...");
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn;
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan;
        }

        console.log("Connected to RabbitMQ");
        chan.assertQueue(queueName, { durable: true });
        chan.consume(
          queueName,
          (msg: Message | null) => {
            if (msg) {
              const parsed = JSON.parse(msg.content.toString());
              switch (parsed.action) {
                case "UPLOAD_TRACK_IMAGE":
                  upload(parsed.data.image, "/tracks/image/");
                  break;
                case "UPLOAD_TRACK_AUDIO":
                  upload(parsed.data.audio, "/tracks/audio/");
                  break;
                case "UPLOAD_PROFILE_IMAGE":
                  upload(parsed.data.audio, "/profileImages/");
                  break;
                default:
                  break;
              }
            }
          },
          { noAck: true }
        );
      });
    });
  };
};

export default createMQConsumer;
