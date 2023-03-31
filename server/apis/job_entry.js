function addJob(req, res, db){
    //console.log("submit in backend");
    const order_number = req.body.order_number;
    const importer_name = req.body.importer_name;
    const mother_vessel_name = req.body.mother_vessel_name;
    const eta = req.body.eta;
    const commodity = req.body.commodity;
    const mv_location = req.body.mv_location;
    const bl_quantity = req.body.bl_quantity;
    const stevedore_name = req.body.stevedore_name;
    const stevedore_contact_number = req.body.stevedore_contact_number;
    const create_job =
        "INSERT INTO job_entry (order_number, importer_name, mother_vessel_name, eta, commodity, mv_location, bl_quantity, stevedore_name, stevedore_contact_number) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(
        create_job,
        [
            order_number,
            importer_name,
            mother_vessel_name,
            eta,
            commodity,
            mv_location,
            bl_quantity,
            stevedore_name,
            stevedore_contact_number,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
}

function getJob(req, res, db){
    const sqlSelect = "SELECT * from job_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function updatejob(req, res, db){
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const importer_name = req.body.new_importer_name;
    const mother_vessel_name = req.body.new_mother_vessel_name;
    const eta = req.body.new_eta;
    const commodity = req.body.new_commodity;
    const mv_location = req.body.new_mv_location;
    const bl_quantity = req.body.new_bl_quantity;
    const stevedore_name = req.body.new_stevedore_name;
    const stevedore_contact_number = req.body.new_stevedore_contact_number;
    //console.log(id);
    const sqlUpdate =
        "UPDATE job_entry SET order_number=?, importer_name=?, mother_vessel_name=?, eta=?, commodity=?, mv_location=?, bl_quantity=?, stevedore_name=?, stevedore_contact_number=? where id= ?";
    db.query(
        sqlUpdate,
        [
            order_number,
            importer_name,
            mother_vessel_name,
            eta,
            commodity,
            mv_location,
            bl_quantity,
            stevedore_name,
            stevedore_contact_number,
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

function deleteJob(req, res, db){
    //console.log("Delete job in backend");
    const id = req.body.job_id;
    const sqlDelete = "DELETE from job_entry where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

function getComodity(req, res, db){
    var order_number = req.query.order_number;
    const sqlSelect = `SELECT commodity from job_entry where order_number =  '${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        console.log(result);
        res.send(result);
    });
}

module.exports.addJob = addJob;
module.exports.getJob = getJob;
module.exports.updatejob = updatejob;
module.exports.deleteJob = deleteJob;
module.exports.getComodity = getComodity;