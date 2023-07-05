const { ToastRes } = require("./util");

function addCurrentStatus(req, res, db) {
	const {
		LV_name,
		date_from_charpotro,
		commodity,
		LA,
		dest_from,
		dest_to,
		current_location,
		remark,
	} = req?.body;

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
			res.json(
				err
					? ToastRes("error", "creating current status")
					: ToastRes("create", `${order_job_number}`)
			);
		}
	);
}

const filterData = {
	All: "",
	Own: "and r.LA_name = 'KEL-BD'",
	Other: "and r.LA_name != 'KEL-BD'",
};

function getCurrentStatus(req, res, db) {
	const filterByShip = req?.query.filterByShip;
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
                                where sixty_percent_payment_amount is not NULL 
        ) ${filterData[filterByShip]}`;

	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function updateCurrentStatus(req, res, db) {
	const { id, order_job_number, current_location, remark, trip_completed } =
		req?.body;
	const time_updated = new Date().toISOString();

	const sqlUpdate =
		"UPDATE current_status SET current_location=?, remark=?, time_updated=?, trip_completed=?  where id= ?";
	db.query(
		sqlUpdate,
		[current_location, remark, time_updated, trip_completed, id],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "updating current status")
					: ToastRes("update", `${order_job_number}`)
			);
		}
	);
}

function deleteCurrentStatus(req, res, db) {
	const id = req?.body.status_id;
	const order_job_number = req?.body.order_job_number;

	const sqlDelete = "DELETE from current_status where id= ?";
	db.query(sqlDelete, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "deleting current status")
				: ToastRes("delete", `${order_job_number}`)
		);
	});
}

module.exports.addCurrentStatus = addCurrentStatus;
module.exports.getCurrentStatus = getCurrentStatus;
module.exports.updateCurrentStatus = updateCurrentStatus;
module.exports.deleteCurrentStatus = deleteCurrentStatus;
