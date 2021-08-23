const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const workboxBuild = require('workbox-build');

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

// Respect PUBLIC_URL of React
const pathPrefixTransform = async (manifestEntries) => {
  const pathPrefix = process.env.PUBLIC_URL === '/' ? '/' : `${process.env.PUBLIC_URL}/`;

  const manifest = manifestEntries.map((entry) => {
    if (entry.url) {
      // eslint-disable-next-line no-param-reassign
      entry.url = pathPrefix + entry.url;
    }
    return entry;
  });

  return { manifest, warnings: [] };
};

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => workboxBuild.injectManifest({
  swSrc: 'src/sw-template.js', // this is your sw template file
  swDest: 'build/service-worker.js', // this will be created in the build step
  globDirectory: 'build',
  globPatterns: [
    // eslint-disable-next-line no-useless-escape
    '**\/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,json}'
  ],
  manifestTransforms: [pathPrefixTransform]
}).then(({ count, size, warnings }) => {
  // Optionally, log any warnings and details.
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);
});

buildSW();
