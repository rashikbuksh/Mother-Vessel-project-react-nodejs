function addPredefined(req, res, db) {
    //console.log("submit in backend");
    const LV_name = req.body.LV_name;
    //const date_from_charpotro = req.body.date_from_charpotro;
    //const commodity = req.body.commodity;
    // const LA = req.body.LA;
    // const dest_from = req.body.dest_from;
    // const dest_to = req.body.dest_to;
    // const current_location = req.body.current_location;
    // const remark = req.body.remark;
    const create_predefinedship =
        "INSERT INTO pre_defined_ship (LV_name) VALUES (?)";
    db.query(create_predefinedship, [LV_name], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
}
function getPredefined(req, res, db) {
    const sqlSelect = "SELECT * from pre_defined_ship";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updatePredefined(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    //console.log(id);
    const sqlUpdate =
        "UPDATE pre_defined_ship SET date_from_charpotro=?, commodity=?, LA=?, dest_from=?, dest_to=?, current_location=?, remark=?  where id= ?";
    db.query(
        sqlUpdate,
        [
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
function deletePredefined(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.status_id;
    const sqlDelete = "DELETE from pre_defined_ship where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}
function getLV(req, res, db) {
    const sqlSelect = "SELECT LV_name as value from pre_defined_ship";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

module.exports.addPredefined = addPredefined;
module.exports.getPredefined = getPredefined;
module.exports.updatePredefined = updatePredefined;
module.exports.deletePredefined = deletePredefined;
module.exports.getLV = getLV;
