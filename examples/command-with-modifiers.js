// Define a custom script that shows example of SET command
// with several modifiers.

import { createClient } from 'redis';

async function commandWithModifiers() {
  const client = createClient();

  await client.connect();

  await client.set('mykey', 'myvalue', {
    EX: 60,
    GET: true
  });

  await client.set('mykey', 'newvalue', {
    EX: 60,
    GET: true
  });

  await client.quit();
}

commandWithModifiers();

