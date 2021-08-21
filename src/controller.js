import { LATEST_STATS } from './server.js';
import { timestamp } from './utils.js';

export function httpListener(req, res) {
  const url = req.url;

  // Routes
  if (url === '/online') {
    onlineHandler(req, res);
    return;
  }
  if (url === '/stats') {
    statsHandler(req, res);
    return;
  }
  logger(404, req);
  res.writeHead(404);
  res.end();
}

// Route Handlers

// /stats
const statsHandler = (req, res) => {
  if (LATEST_STATS.length < 1) {
    logger(204, req);
    res.writeHead(204);
    res.end();
    return;
  }
  resJson(req, res, LATEST_STATS);
};

// /online
const onlineHandler = (req, res) => {
  if (LATEST_STATS.length < 1) {
    logger(204, req);
    res.writeHead(204);
    res.end();
    return;
  }

  const online = LATEST_STATS.map((stats) => {
    return {
      worker: stats.worker,
      workerID: stats.workerID,
      online: stats.online
    };
  });
  resJson(req, res, online);
};

////////////////////////////////////////////////////////////////////////////////
// Utilitiy functions

function resJson(req, res, data) {
  logger(200, req);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function logger(code, req) {
  console.log(timestamp(), `API: ${req.method} ${req.url} - ${code}`);
}
