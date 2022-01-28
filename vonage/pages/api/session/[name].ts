import type { NextApiRequest, NextApiResponse } from 'next'
import OpenTok from 'opentok';

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

const newToken = (sessionId: string): string => {
  return opentok.generateToken(sessionId);
};

type Data = {
  name: string,
  id: string,
  token: string,
  key: string,
};

const sessions = new Map();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.query?.name as string;
  if (!sessions.has(name)) {
    sessions.set(name, await newSession());
  }
  const sessionId = sessions.get(name);
  const token = newToken(sessionId);
  res.status(200).json({ name, id: sessionId, token, key: apiKey });
}
