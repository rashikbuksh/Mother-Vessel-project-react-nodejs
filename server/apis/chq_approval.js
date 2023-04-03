function addChqApproval(req, res, db) {
    //console.log("submit in backend");
    const order_job_number = req.body.order_job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const capacity_ton = req.body.capacity_ton;
    const rate = req.body.rate;
    const sixty_percent_payment = req.body.sixty_percent_payment;
    const forty_percent_payment = req.body.forty_percent_payment;
    const damarage = req.body.damarage;
    const second_trip = req.body.second_trip;
    const third_trip = req.body.third_trip;
    const direct_trip = req.body.direct_trip;
    const create_chq =
        "INSERT INTO chq_approval (order_job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, MV_name, dest_from, dest_to, capacity_ton, rate, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            MV_name,
            dest_from,
            dest_to,
            capacity_ton,
            rate,
            sixty_percent_payment,
            forty_percent_payment,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
}
function getChqApproval(req, res, db) {
    const sqlSelect = "SELECT * from chq_approval";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updateChqApproval(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const job_number = req.body.new_job_number;
    const date_from_charpotro = req.body.new_date_from_charpotro;
    const cp_number_from_charpotro = req.body.new_cp_number_from_charpotro;
    const LA_name = req.body.new_LA_name;
    const LV_name = req.body.new_LV_name;
    const MV_name = req.body.new_MV_name;
    const dest_from = req.body.new_dest_from;
    const dest_to = req.body.new_dest_to;
    const capacity_ton = req.body.new_capacity_ton;
    const rate = req.body.new_rate;
    const sixty_percent_payment = req.body.new_sixty_percent_payment;
    const forty_percent_payment = req.body.new_forty_percent_payment;
    const damarage = req.body.new_damarage;
    const second_trip = req.body.new_second_trip;
    const third_trip = req.body.new_third_trip;
    const direct_trip = req.body.new_direct_trip;
    const sqlUpdate =
        "UPDATE chq_approval SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, MV_name=?, dest_from=?, dest_to=?, capacity_ton=?, rate=?, sixty_percent_payment=?, forty_percent_payment=?, damarage=?, second_trip=?, third_trip=?, direct_trip=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            MV_name,
            dest_from,
            dest_to,
            capacity_ton,
            rate,
            sixty_percent_payment,
            forty_percent_payment,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
}
function deleteChqApproval(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete = "DELETE from chq_approval where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addChqApproval = addChqApproval;
module.exports.getChqApproval = getChqApproval;
module.exports.updateChqApproval = updateChqApproval;
module.exports.deleteChqApproval = deleteChqApproval;
