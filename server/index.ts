import OpenTok from 'opentok';
import { start } from './server';

// fetch values from environment variables
const apiKey = process.env.VONAGE_API_KEY || "apiKey";
const apiSecret = process.env.VONAGE_API_SECRET || "apiSecret";

// create client
const opentok = new OpenTok(apiKey, apiSecret);
opentok.createSession({
  archiveMode: 'manual',
}, (err, session) => {
  // if there was an error, return it, and exit
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // if no session ID was returned, exit
  if (!session?.sessionId) {
    console.error("No session ID");
    process.exit(1);
  }

  start(session.sessionId);
});
