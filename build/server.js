// require('./check-versions')();

// var config = require('../config');
// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// }
// var port = process.env.PORT || config.dev.port;
// const { JSDOM } = require('jsdom');
// const dom = new JSDOM('<!DOCTYPE html></html>', { url: 'http://localhost:'+port });
// global.window = dom.window;
// global.document = window.document;
// global.navigator = window.navigator;

// const cookieParser = require('cookie-parser');
// const router = require('../server/router.js');
// const cors = require('cors');
// const hasToken = require('../server/has-token.js');

// const fs = require('fs');
// const path = require('path');
// const LRU = require('lru-cache');
// const express = require('express');
// const favicon = require('serve-favicon');
// const compression = require('compression');
// const resolve = file => path.resolve(__dirname, file);
// const { createBundleRenderer } = require('vue-server-renderer');

// const isProd = process.env.NODE_ENV === 'production';
// const useMicroCache = process.env.MICRO_CACHE !== 'false';
// const serverInfo =
//   `express/${require('express/package.json').version} ` +
//   `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

// const app = express();
// app.use(cookieParser());
// // model
// const template = fs.readFileSync(resolve('../src/index.template.html'), 'utf-8');

// function createRenderer (bundle, options) {
//   // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
//   return createBundleRenderer(bundle, Object.assign(options, {
//     template,
//     // for component caching
//     cache: LRU({
//       max: 1000,
//       maxAge: 1000 * 60 * 15
//     }),
//     // this is only needed when vue-server-renderer is npm-linked
//     basedir: resolve('../dist'),
//     // recommended for performance
//     runInNewContext: true
//   }));
// }

// const serve = (path, cache) => express.static(resolve(path), {
//   maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
// })

// app.use(cors());
// app.use(compression({ threshold: 0 }));
// app.use(favicon('./public/logo-48.png'));
// app.use('/dist', serve('./dist', true));
// app.use('/public', serve('./public', true));
// app.use('/manifest.json', serve('./manifest.json', true));
// app.use('/service-worker.js', serve('./dist/service-worker.js'));