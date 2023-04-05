function addCurrentStatus(req, res, db) {
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
            res.send(result);
        }
    );
}

function getCurrentStatus(req, res, db) {
    const sqlSelect = `SELECT 
            c.id as id,
            c.order_job_number as order_job_number,
            r.date_from_charpotro as date_from_charpotro, 
            r.LA_name as LA_name, 
            r.LV_name as LV_name, 
            r.dest_from as dest_from, 
            r.dest_to as dest_to, 
            c.current_location as current_location,    
            c.remark as remark,
            c.time_updated as time_updated,
            c.trip_completed as trip_completed,
            (   select commodity
                from job_entry
                where order_number = r.order_number
            ) as commodity                
        from 
            current_status c join record_entry r 
            on c.order_job_number = concat(r.order_number, '-', r.job_number) 
        where c.order_job_number in (
                                select order_job_number
                                from chq_approval
                                where sixty_percent_payment is not NULL
        );`;

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function updateCurrentStatus(req, res, db) {
    const id = req.body.id;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    const trip_completed = req.body.trip_completed;
    const time_updated = new Date().toISOString();
    const sqlUpdate =
        "UPDATE current_status SET current_location=?, remark=?, time_updated=?, trip_completed=?  where id= ?";
    db.query(
        sqlUpdate,
        [current_location, remark, time_updated, trip_completed, id],
        (err, result) => {
            if (err) console.log(err);
        }
    );
}

function deleteCurrentStatus(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.status_id;
    const sqlDelete = "DELETE from current_status where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);

        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addCurrentStatus = addCurrentStatus;
module.exports.getCurrentStatus = getCurrentStatus;
module.exports.updateCurrentStatus = updateCurrentStatus;
module.exports.deleteCurrentStatus = deleteCurrentStatus;
