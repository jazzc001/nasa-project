const { getAllLaunches,
    // addNewLaunch,
    scheduleNewLaunch,
    exitsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

const {
    getPagination,
} = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    console.log(req.query);
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    //validating client input in the launching date
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Mission required launch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    //validating client input on the format of launch date
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }
        
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const exitslaunch = await exitsLaunchWithId(launchId);
    //if launch does not exist
    if (!exitslaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    // if launch does exit
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }
    return res.status(200).json({
        ok: true,
    });
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};