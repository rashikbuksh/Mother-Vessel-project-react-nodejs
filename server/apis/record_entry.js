function addRecord(req, res, db){
    //console.log("submit in backend");
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const commodity = req.body.commodity;
    const capacity = req.body.capacity;
    const rate = req.body.rate;
    const LV_master_name = req.body.LV_master_name;
    const LV_master_contact_number = req.body.LV_master_contact_number;
    const create_record =
        "INSERT INTO record_entry (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, commodity, capacity, rate, LV_master_name, LV_master_contact_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_record,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            dest_from,
            dest_to,
            commodity,
            capacity,
            rate,
            LV_master_name,
            LV_master_contact_number,
        ],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result);
            res.send(result);
        }
    );
}

function getRecord(req, res, db){
    const sqlSelect = "SELECT * from record_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}


function updaterecord(req, res, db){
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const commodity = req.body.commodity;
    const capacity = req.body.capacity;
    const rate = req.body.rate;
    const LV_master_name = req.body.LV_master_name;
    const LV_master_contact_number = req.body.LV_master_contact_number;
    //console.log(id);
    const sqlUpdate =
        "UPDATE record_entry SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, dest_from=?, dest_to=?, commodity=?, capacity=?, rate=?, LV_master_name=?, LV_master_contact_number=? where id= ?";
    db.query(
        sqlUpdate,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            dest_from,
            dest_to,
            commodity,
            capacity,
            rate,
            LV_master_name,
            LV_master_contact_number,
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

function deleteRecord(req, res, db){
    //console.log("Delete record in backend");
    const id = req.body.record_id;
    const sqlDelete = "DELETE from record_entry where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

 function fetchJobNumber(req, res, db){
    var order_number = req.query.order_number;
    console.log("query job number: ", order_number);
    const sqlSelect = `SELECT job_number as 'value' from record_entry where order_number = '${order_number}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
 }

function getCharpotroCpLaLvRate(req, res, db){
    var order_job_number = req.query.order_job_number;
    console.log("order_job_number", order_job_number);
    const sqlSelect = `SELECT date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, rate, dest_from, dest_to from record_entry where CONCAT(order_number, '-', job_number) = '${order_job_number}'`;

    db.query(sqlSelect, [order_job_number], (err, result) => {
        console.log(result);
        res.send(result);
    });
}

module.exports.addRecord = addRecord;
module.exports.getRecord = getRecord;
module.exports.updaterecord = updaterecord;
module.exports.deleteRecord = deleteRecord;
module.exports.fetchJobNumber = fetchJobNumber;
module.exports.getCharpotroCpLaLvRate = getCharpotroCpLaLvRate;