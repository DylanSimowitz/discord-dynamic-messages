import { Client, Message } from 'discord.js';
import * as path from 'path';
import { AccumulatorMessage } from './AccumulatorMessage';
import { AttachMessage } from './AttachMessage';
import { CounterMessage } from './CounterMessage';
import { EchoMessage } from './EchoMessage';

// tslint:disable-next-line no-var-requires
const secrets = require(path.resolve(__dirname, '..', 'secrets.json'));

const client = new Client();

client.on('ready', async ()  => {
  // tslint:disable-next-line:no-console
  console.info(`Client ready`);

  const attachMessage = new AttachMessage();

  client.on('message', async (message) => {
    if (! message.content.startsWith('$')) { return; }
    const [command, ...args] = message.content.substr(1).split(' ');

    if (command === 'count') {
      new CounterMessage({
        initialCounterValue: Number(args[0] || '0'),
      }).sendTo(message.channel);
    } else if (command === 'echo') {
      new EchoMessage(args.join(' ')).replyTo(message);
    } else if (command === 'acc') {
      new AccumulatorMessage().sendTo(message.channel);
    } else if (command === 'attach') {
      const dummyMsg = await message.channel.send('dummy message') as Message;
      attachMessage.attachTo(dummyMsg);
    }

  });
});

client.login(secrets.discord_token)
  .then(() => {
    // tslint:disable-next-line:no-console
    console.info(`Login successful`);
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.error(`Login failed`);
    throw err;
  });
