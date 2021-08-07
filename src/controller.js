import { LATEST_STATS } from './server.js';

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

  res.writeHead(404);
  res.end();
}

// Route Handlers

// /stats
const statsHandler = (req, res) => {
  if (LATEST_STATS.length < 1) {
    res.writeHead(204);
    res.end();
    return;
  }
  resJson(res, LATEST_STATS);
};

// /online
const onlineHandler = (req, res) => {
  if (LATEST_STATS.length < 1) {
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
  resJson(res, online);
};

////////////////////////////////////////////////////////////////////////////////
// Utilitiy functions

function resJson(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}
