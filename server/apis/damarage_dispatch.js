function addDamarage(req, res, db) {
    //console.log("submit in backend");
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date = req.body.date;
    const cp_number = req.body.cp_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const volume = req.body.volume;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const loading_location = req.body.loading_location;
    const unloading_location = req.body.unloading_location;
    const loading_start_time_stamp = req.body.loading_start_time_stamp;
    const loading_completion_time_stamp =
        req.body.loading_completion_time_stamp;
    const sailing_time_stamp = req.body.sailing_time_stamp;
    const duration_of_travel_time = req.body.duration_of_travel_time;
    const unloading_start_time_stamp = req.body.unloading_start_time_stamp;
    const unloading_completion_time_stamp =
        req.body.unloading_completion_time_stamp;
    const others = req.body.others;
    const total_elapsed_time = req.body.total_elapsed_time;
    const voyage_time = req.body.voyage_time;
    const free_time = req.body.free_time;
    const total_despatch = req.body.total_despatch;
    const daily_despatch = req.body.daily_despatch;
    console.log(job_number);
    const create_damarage =
        "INSERT INTO damarage_dispatch(order_number, job_number, date, cp_number, date_from_charpotro, commodity, volume, LV_name, MV_name, loading_location, unloading_location, loading_start_time_stamp, loading_completion_time_stamp, sailing_time_stamp, duration_of_travel_time, unloading_start_time_stamp, unloading_completion_time_stamp, others, total_elapsed_time, voyage_time, free_time, total_despatch, daily_despatch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_damarage,
        [
            order_number,
            job_number,
            date,
            cp_number,
            date_from_charpotro,
            commodity,
            volume,
            LV_name,
            MV_name,
            loading_location,
            unloading_location,
            loading_start_time_stamp,
            loading_completion_time_stamp,
            sailing_time_stamp,
            duration_of_travel_time,
            unloading_start_time_stamp,
            unloading_completion_time_stamp,
            others,
            total_elapsed_time,
            voyage_time,
            free_time,
            total_despatch,
            daily_despatch,
        ],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function getDamarage(req, res, db) {
    const sqlSelect = "SELECT * from damarage_dispatch";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updateDamarage(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date = req.body.date;
    const cp_number = req.body.cp_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const volume = req.body.volume;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const loading_location = req.body.loading_location;
    const unloading_location = req.body.unloading_location;
    const loading_start_time_stamp = req.body.loading_start_time_stamp;
    const loading_completion_time_stamp =
        req.body.loading_completion_time_stamp;
    const sailing_time_stamp = req.body.sailing_time_stamp;
    const duration_of_travel_time = req.body.duration_of_travel_time;
    const unloading_start_time_stamp = req.body.unloading_start_time_stamp;
    const unloading_completion_time_stamp =
        req.body.unloading_completion_time_stamp;
    const others = req.body.others;
    const total_elapsed_time = req.body.total_elapsed_time;
    const voyage_time = req.body.voyage_time;
    const free_time = req.body.free_time;
    const total_despatch = req.body.total_despatch;
    const daily_despatch = req.body.daily_despatch;
    console.log(id);
    const sqlUpdate =
        "UPDATE damarage_dispatch SET order_number=?, job_number=?, date=?, cp_number=?, date_from_charpotro=?, commodity=?, volume=?, LV_name=?, MV_name=?, loading_location=?, unloading_location=?, loading_start_time_stamp=?, loading_completion_time_stamp=?, sailing_time_stamp=?, duration_of_travel_time=?, unloading_start_time_stamp=?, unloading_completion_time_stamp=?, others=?, total_elapsed_time=?, voyage_time=?, free_time=?, total_despatch=?, daily_despatch=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
            order_number,
            job_number,
            date,
            cp_number,
            date_from_charpotro,
            commodity,
            volume,
            LV_name,
            MV_name,
            loading_location,
            unloading_location,
            loading_start_time_stamp,
            loading_completion_time_stamp,
            sailing_time_stamp,
            duration_of_travel_time,
            unloading_start_time_stamp,
            unloading_completion_time_stamp,
            others,
            total_elapsed_time,
            voyage_time,
            free_time,
            total_despatch,
            daily_despatch,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function deleteDamarage(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.Dam_id;
    const sqlDelete = "DELETE from damarage_dispatch where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);

        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addDamarage = addDamarage;
module.exports.getDamarage = getDamarage;
module.exports.updateDamarage = updateDamarage;
module.exports.deleteDamarage = deleteDamarage;
