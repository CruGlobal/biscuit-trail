# Digital Biscuit Trail

This is a monorepo with 2 separate applications, the API and the WEB.

The **API** runs an express server and WebSockets application that keeps track of the room and game states for each room. It also handles sending/receiving the WebSockets from users and distributing out updates

The **WEB** is the HTML/JS/CSS code that is hosted on a static server and connects to the WebSocket backend.

### Build

- API - `npm run build:api`
- WEB - `npm run build:web`

### Run

- API - `npm run start:api`
- WEB - `npm run start:web`

### Deploy

1. Setup heroku
2. Run `git push heroku master`
3. `https://digital-biscuit-trail-devapi.herokuapp.com/`
4. `https://digital-biscuit-trail-dev.netlify.app/`
