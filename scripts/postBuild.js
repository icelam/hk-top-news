const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  path.resolve(__dirname, '../.env.production.local'),
  path.resolve(__dirname, '../.env.production'),
  path.resolve(__dirname, '../.env')
].filter((dotenvFile) => fs.existsSync(dotenvFile));

console.log(`${dotenvFiles[0]} will be used.\n`);

// Load env variables
dotenv.config({
  path: dotenvFiles[0]
});

const BASE_DIR = path.join(__dirname, '..');
const FILE_PATH = path.join(BASE_DIR, 'build/api/NewsApi.php');

(async () => {
  try {
    const file = await fs.promises.readFile(FILE_PATH, 'utf8');
    const updated = file.replace(/<API_KEY_HERE>/g, process.env.NEWS_API_KEY);
    await fs.promises.writeFile(FILE_PATH, updated);
  } catch (error) {
    console.error(error);
  }
})();
