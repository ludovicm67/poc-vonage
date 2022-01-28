# Vonage POC

This is a proof of concept using Vonage SDK.

## Quick start

```sh
# configure some environment variables
cp .env.example .env
vim .env # edit it using your favorite editor

# install dependencies
npm install

# start the project (listen to changes)
npm run dev
```

And go to: http://localhost:3000/

## Concepts

The route `GET /api/session/:name` will generate an answer which will look like this:

```json
{
  "name": "sessionName",
  "id": "sessionId",
  "token": "token",
  "key": "apiKey"
}
```

The `name` will get the value from `:name`.

The `sessionId` will be generated the first time a session name is called.
For the next callers, it will serve the value generated previously.

A new value for `token` will be generated each time this URL is called for this session.

The `key` is simply the value of the `VONAGE_API_KEY` environment variable.

When the client is loaded, it will do a request to the route mentionned above and directly start a session call.

## Useful resources

- Vonage account overview: https://tokbox.com/account/#/
- NodeJS SDK: https://tokbox.com/developer/sdks/node/
- Basic tutorial: https://tokbox.com/developer/tutorials/web/basic-video-chat/
