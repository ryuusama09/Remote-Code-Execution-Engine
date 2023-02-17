require("dotenv").config();
const util = require("util");
const executeCommand = util.promisify(require("child_process").exec);
const Dockerode = require("dockerode");
const dockerode = new Dockerode();
const amqp = require("amqplib");
const { downloadFromS3AndWrite } = require("./utils/s3");
const extensions = require("./utils/extensions");
const fs = require("fs");
var path = require("path");

const {
  url,
  exchangeName,
  queueName,
  bindingKey,
} = require("./config/rabbitmq");

async function consumeMessage() {
  try {
    // set up
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct");
    const q = await channel.assertQueue(queueName);
    await channel.bindQueue(q.queue, exchangeName, bindingKey);
    // consume
    channel.consume(q.queue, async (msg) => {
      try {
        console.log("Consuming..");
        // Step 1
        const data = JSON.parse(msg.content);

        // Step 2

        // make folder for current submission
        const dir = path.join(__dirname, "shared", `${data.id}`);
        await fs.promises.mkdir(dir);
        console.log("folder created");

        const src_location = `./shared/${data.id}/code.${
          extensions[data.lang]
        }`;
        const input_location = `./shared/${data.id}/input.txt`;
        const success2a = await downloadFromS3AndWrite(data.src, src_location);
        const success2b = await downloadFromS3AndWrite(
          data.input,
          input_location
        );
        if (!success2a || !success2b)
          throw "Download and Saving from s3 unsuccessful";

        const command = `docker run -e ID='${data.id}' -v shared:/usr/${data.lang}/shared rce/spawner`;
        await executeCommand(command);
        console.log("container spinned..");

        const path1 = path.join(
          __dirname,
          "shared",
          `${data.id}`,
          "output.txt"
        );
        var string = fs.readFileSync(path1, "utf8");
        console.log("content of output = ", string);

        channel.ack(msg);
      } catch (e) {
        console.log(e.message);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

consumeMessage();
