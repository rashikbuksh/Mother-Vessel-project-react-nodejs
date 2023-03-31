function addCurrentStatus(req, res, db){
    //console.log("submit in backend");
    const LV_name = req.body.LV_name;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    const create_current_status =
        "INSERT INTO current_status (LV_name, date_from_charpotro, commodity, LA, dest_from, dest_to, current_location, remark) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
        create_current_status,
        [
            LV_name,
            date_from_charpotro,
            commodity,
            LA,
            dest_from,
            dest_to,
            current_location,
            remark,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
}

function getCurrentStatus(req, res, db){
    const sqlSelect = "SELECT * from current_status";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function updateCurrentStatus(req, res, db){
    //console.log("update job info in backend");
    const id = req.body.id;
    const LV_name = req.body.LV_name;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    //console.log(id);
    const sqlUpdate =
        "UPDATE current_status SET LV_name=?, date_from_charpotro=?, commodity=?, LA=?, dest_from=?, dest_to=?, current_location=?, remark=?  where id= ?";
    db.query(
        sqlUpdate,
        [
            LV_name,
            date_from_charpotro,
            commodity,
            LA,
            dest_from,
            dest_to,
            current_location,
            remark,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
}

function deleteCurrentStatus(req, res, db){
    //console.log("Delete status in backend");
    const id = req.body.status_id;
    const sqlDelete = "DELETE from current_status where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addCurrentStatus = addCurrentStatus;
module.exports.getCurrentStatus = getCurrentStatus;
module.exports.updateCurrentStatus = updateCurrentStatus;
module.exports.deleteCurrentStatus = deleteCurrentStatus;