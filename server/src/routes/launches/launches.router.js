// we need to access to express framework coz we need to use the express build in router
const express = require('express');
const { 
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;