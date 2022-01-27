import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  id: string,
};

const sessions = new Map();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = "SessionName";
  const d = new Date();
  if (!sessions.has(name)) {
    sessions.set(name, d.toISOString());
  }
  const sessionId = sessions.get(name);
  res.status(200).json({ name, id: sessionId });
}
