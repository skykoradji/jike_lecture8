const express = require('express');
const next = require('next');
require('dotenv').config();
const { parse } = require('url');
const { join } = require('path');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;
const app = next({ dev });

// Nextjs's server prepared
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    // server.get('*', (req, res) => {
    //   const parsedUrl = parse(req.url, true);
    //   const rootStaticFiles = ['/robots.txt'];
    //   if (rootStaticFiles.includes(parsedUrl.pathname)) {
    //     const staticPath = join(__dirname, '../static', parsedUrl.pathname);
    //     app.serveStatic(req, res, staticPath);
    //   } else {
    //     handler(req, res, parsedUrl);
    //   }
    // });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`); // eslint-disable-line no-console
    });
  })
  .catch(ex => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
