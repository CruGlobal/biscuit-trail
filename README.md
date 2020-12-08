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





## How to add a langauge/translation

 - First, add it into `constants.ts` (look up the i18n name for the translation, eg. French is `fr`)
 - Change the `TranslationsConfig` in utils/translations.ts
 - Download the flag as an "SVG" from https://openmoji.org/library/#search=flag, add it to the /components/Flag/index.ts file
 - Change the `getUserLocaleWithConfig` mapping in utils/translations.ts
 - Add the new translation values in utils/translations/simpleText.ts
 - Add the new translation values in utils/translations/cards.ts

 #### Notes 
 
 The easiest way I've found to add a new translation is to get the PDF file will all cards and language. Copy the text from each card into the `utils/translations/cards.ts` file into the translation under `frontText`. Then copy the examples into the `backText` under each card.

 For the image downloads of a new translation, take a screenshot from the PDF of the Front/Back of the card of each card type. Name them, `Card1.png`, `Card2.png`, ... Then create a folder named the translation prefix under `public/img/cards/`. Then add all the new screenshots into that folder.