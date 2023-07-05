const { ToastRes } = require("./util");

function addPayment(req, res, db) {
	const {
		order_job_number,
		LV_name,
		LA_name,
		commodity,
		chq_issue_date,
		amount,
		part_pay,
		payment,
		balance,
		payment_chq_no,
		payment_chq_amount,
		payment_chq_date,
	} = req?.body;

	const create_chq =
		"INSERT INTO payment (order_job_number, LA_name, LV_name, commodity, chq_issue_date, amount, part_pay, payment, balance, payment_chq_no, payment_chq_amount, payment_chq_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
	db.query(
		create_chq,
		[
			order_job_number,
			LA_name,
			LV_name,
			commodity,
			chq_issue_date,
			amount,
			part_pay,
			payment,
			balance,
			payment_chq_no,
			payment_chq_amount,
			payment_chq_date,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "creating payment")
					: ToastRes("create", `${order_job_number}`)
			);
		}
	);
}
function getPayment(req, res, db) {
	const sqlSelect = `SELECT id, order_job_number, payment_chq_no,payment_chq_amount, payment_chq_date, LV_name, LA_name, commodity, chq_issue_date, amount, part_pay, payment, balance FROM payment`;
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}
function updatePayment(req, res, db) {
	const {
		id,
		order_job_number,
		LV_name,
		date_from_charpotro,
		MV_name,
		commodity,
		chq_no,
		chq_issue_date,
		amount,
		part_pay,
		payment_approved,
		balance,
		payment_chq_no,
		payment_chq_amount,
		payment_chq_date,
		added_date,
	} = req?.body;
	const sqlUpdate =
		"UPDATE payment SET order_job_number=?, LV_name=?, date_from_charpotro=?, MV_name=?, commodity=?, chq_no=?, chq_issue_date=?, amount=?, part_pay=?, payment_approved=?, balance=?, payment_chq_no=?, payment_chq_amount=?, payment_chq_date=?, added_date=? WHERE id=?";
	db.query(
		sqlUpdate,
		[
			order_job_number,
			LV_name,
			date_from_charpotro,
			MV_name,
			commodity,
			chq_no,
			chq_issue_date,
			amount,
			part_pay,
			payment_approved,
			balance,
			payment_chq_no,
			payment_chq_amount,
			payment_chq_date,
			added_date,
			id,
		],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "updating payment")
					: ToastRes("update", `${order_job_number}`)
			);
		}
	);
}
function deletePayment(req, res, db) {
	const id = req?.body.Pay_id;
	const sqlDelete = "DELETE from payment where id= ?";
	db.query(sqlDelete, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "deleting payment")
				: ToastRes("delete", `${order_job_number}`)
		);
	});
}

function getOrderNumFromOrderJobNum(order_job_number) {
	var order_number_split = order_job_number?.split("-");
	var order_number = "";
	for (var i = 0; i < order_number_split?.length - 1; i++) {
		order_number += order_number_split[i] + "-";
	}
	order_number = order_number.substring(0, order_number?.length - 1);
	return order_number;
}

function getCharpotroLvToPayment(req, res, db) {
	var order_number = getOrderNumFromOrderJobNum(req?.query?.order_job_number);
	const sqlSelect = `SELECT date_from_charpotro,LV_name from record_entry where order_number ='${order_number}'`;
	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}

function getMvNameToPayment(req, res, db) {
	var order_number = getOrderNumFromOrderJobNum(req?.query?.order_job_number);
	const sqlSelect = `SELECT mother_vessel_name as MV_name from job_entry where order_number ='${order_number}'`;
	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}
function getComodityToPayment(req, res, db) {
	var order_number = getOrderNumFromOrderJobNum(req?.query?.order_job_number);
	const sqlSelect = `SELECT commodity from job_entry where order_number ='${order_number}'`;
	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}
function getChqissuePartpayBalanceToPayment(req, res, db) {
	var order_number = getOrderNumFromOrderJobNum(req?.query?.order_job_number);
	const sqlSelect = `SELECT chq_issue_date,part_pay,balance from chq_due_list where order_number ='${order_number}'`;
	db.query(sqlSelect, [order_number], (err, result) => {
		res.send(result);
	});
}

module.exports.addPayment = addPayment;
module.exports.getPayment = getPayment;
module.exports.updatePayment = updatePayment;
module.exports.deletePayment = deletePayment;
module.exports.getCharpotroLvToPayment = getCharpotroLvToPayment;
module.exports.getMvNameToPayment = getMvNameToPayment;
module.exports.getComodityToPayment = getComodityToPayment;
module.exports.getChqissuePartpayBalanceToPayment =
	getChqissuePartpayBalanceToPayment;
