// we need to access to express framework coz we need to use the express build in router
const express = require('express');
const { 
    getAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);

module.exports = launchesRouter;