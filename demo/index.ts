import { Client } from 'discord.js';
import * as path from 'path';
import { AccumulatorMessage } from './AccumulatorMessage';
import { CounterMessage } from './CounterMessage';
import { EchoMessage } from './EchoMessage';

// tslint:disable-next-line no-var-requires
const secrets = require(path.resolve(__dirname, '..', 'secrets.json'));

const client = new Client();

client.on('ready', async ()  => {
  console.info(`Client ready`);

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
    }
  });
});

client.login(secrets.discord_token)
  .then(() => console.info(`Login successful`))
  .catch((err) => {
    console.error(`Login failed`);
    throw err;
  });