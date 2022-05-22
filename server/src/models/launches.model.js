//the model only works withe the data on however they stored
const axios = require('axios');


const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

// let latestFlightNumber = 100;


const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Exploration X', //name
    rocket: 'Explorer IS1', //rocket.name
    launchDate: new Date('Decemer 27, 2030'), //date_local
    target: 'Kepler-442 b', //not applicable
    customers: ['ZTM', 'NASA'], //payload.coustomer for each customer
    upcoming: true,  //upcoming
    success: true,  //success
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchData() {
    console.log('Loading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        potions: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                }
            ],
            {
                path: 'payloads',
                select: {
                    'customer': 1
                }
            }
        }
    });
}

// launches.set(launch.flightNumber, launch);

async function exitsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDatabase
        .find({}, {'__id': 0, '__v': 0});
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No  matching planet found');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Zero To Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     launches.set(
//         latestFlightNumber, 
//         Object.assign(launch, {
//             success: true,
//             upcoming: true,
//             customer: ['Zero To Mastery', 'NASA'],
//             flightNumber: latestFlightNumber,
//     }));
// }

async function abortLaunchById(launchId) {
    const aborted =  await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;

//     const aborted = launches.get(launchId);
//     aborted.upcoming = false;
//     aborted.success = false;
//     return aborted;
}

module.exports = {
    loadLaunchData,
    exitsLaunchWithId,
    getAllLaunches,
    // addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
};