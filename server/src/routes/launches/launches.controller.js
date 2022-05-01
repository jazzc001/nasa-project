const { getAllLaunches,
    addNewLaunch,
    exitsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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
        
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    //if launch does not exist
    if (!exitsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    // if launch does exit
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};