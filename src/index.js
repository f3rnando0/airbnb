import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.static(join(__dirname, '/public')));

app.get('/', (request, response) => {
  var language = '';

  const langs = request.acceptsLanguages();

  if (!langs) language = 'en';
  else if (langs[0] === 'it-IT') language = 'it';
  else if (langs[0] === 'pt-BR') language = 'br';
  else if (langs[0] === 'en-US') language = 'en';
  else language = 'en';

  return response
    .status(200)
    .sendFile(join(__dirname + `/html/index.${language}.html`));
});
