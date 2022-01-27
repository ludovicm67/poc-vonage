import Fastify from 'fastify';
import OpenTok from 'opentok';

const fastify = Fastify({ logger: true });
const port = 8080;
const host = "0.0.0.0";

// fetch values from environment variables
const apiKey = process.env.VONAGE_API_KEY || "apiKey";
const apiSecret = process.env.VONAGE_API_SECRET || "apiSecret";
const opentok = new OpenTok(apiKey, apiSecret);

const newSession = async (): Promise<string> => {
  const sessionId: string = await new Promise((resolve, reject) => {
    opentok.createSession({
      archiveMode: 'manual',
    }, (err, session) => {
      // if there was an error, return it, and exit
      if (err) {
        reject(err);
        return;
      }

      // if no session ID was returned, exit
      if (!session?.sessionId) {
        reject("no session ID");
        return;
      }

      resolve(session.sessionId);
    });
  });

  return sessionId;
};

const sessions = new Map();

fastify.get('/', (): any => {
  return {
    hello: "world",
  };
});

fastify.get('/healthz', (): any => {
  return "OK";
});

fastify.get("/session/:name", async ({params}: {params: any}): Promise<any> => {
  if (!params || !params.name) {
    throw new Error("no session name");
  }

  const name = params.name;
  if (!sessions.has(name)) {
    sessions.set(name, await newSession());
  }

  const sessionId = sessions.get(name);
  return {
    name: name,
    id: sessionId,
  };
});

const start = async () => {
  try {
    await fastify.listen(port, host);
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}

start();
