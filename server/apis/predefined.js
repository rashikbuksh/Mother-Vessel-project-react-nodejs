const { ToastRes } = require("./util");

function addPredefined(req, res, db) {
	const {
		LV_name,
		capacity,
		master_reg_number,
		masters_name,
		masters_contact_number,
		staffs_info,
		leased,
		company_name,
		proprietors_name,
		office_address,
		ac_number,
		contact_details,
		status,
	} = req?.body;

	const masters_nid_image_attachment_name = req?.body.fileName;
	const lv_documents_attachement = req?.body.lv_documents_attachementFileName;

	if (masters_nid_image_attachment_name != null) {
		const sqlCreate = `INSERT INTO pre_defined_ship (LV_name, capacity, master_reg_number, masters_name, masters_contact_number, masters_nid_image_attachment, staffs_info, leased, company_name, proprietors_name, office_address, ac_number, contact_details, lv_documents_attachement, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		db.query(
			sqlCreate,
			[
				LV_name,
				capacity,
				master_reg_number,
				masters_name,
				masters_contact_number,
				masters_nid_image_attachment_name,
				staffs_info,
				leased,
				company_name,
				proprietors_name,
				office_address,
				ac_number,
				contact_details,
				lv_documents_attachement,
				status,
			],
			(err, result) => {
				res.json(
					err
						? ToastRes("error", "creating ship")
						: ToastRes("create", `${LV_name}`)
				);
				console.log(err);
			}
		);
	}
}

function getPredefined(req, res, db) {
	const shipName = req?.query.shipName;

	if (shipName) {
		const sqlSelect = "SELECT * from pre_defined_ship where LV_name = ?";
		db.query(sqlSelect, [shipName], (err, result) => {
			res.send(result);
		});
		return;
	}

	const sqlSelect = "SELECT * from pre_defined_ship";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function updatePredefined(req, res, db) {
	const {
		id,
		date_from_charpotro,
		commodity,
		LA,
		dest_from,
		dest_to,
		current_location,
		remark,
	} = req?.body;

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
			res.json(
				err
					? ToastRes("error", "updating ship")
					: ToastRes("update", `${id}`)
			);
		}
	);
}
function deletePredefined(req, res, db) {
	const id = req?.body.status_id;
	const sqlDelete = "DELETE from pre_defined_ship where id= ?";
	db.query(sqlDelete, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "deleting ship")
				: ToastRes("delete", `${id}`)
		);
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
