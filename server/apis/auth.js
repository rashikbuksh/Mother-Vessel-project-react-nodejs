const { ToastRes } = require("./util");

function verifyLogin(req, res, db) {
	const { username, password } = req?.query;

	const get_user =
		"select id, position, password, enabled from users where username=?";

	db.query(get_user, [username], (err, result) => {
		if (result[0]?.enabled === 0) {
			res.json(ToastRes("error", "User is disabled", true));
		} else if (password === result[0]?.password) {
			res.send({
				id: result[0].id,
				position: result[0].position,
			});
		} else {
			res.json(
				ToastRes("error", "Email/Password combination is wrong", true)
			);
		}
	});

	return res;
}

function getUsers(req, res, db) {
	const sqlSelect = "SELECT * from users";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
}

function enableUser(req, res, db) {
	const { id, name } = req?.body;
	const sqlUpdate = "UPDATE users SET enabled=1 where id=?";
	db.query(sqlUpdate, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "enabling user")
				: ToastRes("create", `User: ${name} enabled`, true)
		);
	});
}

function disableUser(req, res, db) {
	const { id, name } = req?.body;
	const sqlUpdate = "UPDATE users SET enabled=0 where id=?";
	db.query(sqlUpdate, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "disabling user")
				: ToastRes("delete", `User: ${name} disabled`, true)
		);
	});
}

function resetPassword(req, res, db) {
	const { id, password } = req?.body;

	const sqlUpdate = "UPDATE users SET password=? where id=?";
	db.query(sqlUpdate, [password, id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "resetting password")
				: ToastRes("create", "Password has been reset", true)
		);
	});
}

function register(req, res, db) {
	const { name, username, password, position, department } = req?.body;

	const create_user =
		"INSERT INTO users (name, username, password, position, department, enabled) VALUES (?,?,?,?,?,0)";
	db.query(
		create_user,
		[name, username, password, position, department],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "creating user")
					: ToastRes("create", `User: ${username}`)
			);
		}
	);
}

function updateInfo(req, res, db) {
	const id = req?.body.user_id;

	const { name, username, position, department } = req?.body;
	const sqlUpdate =
		"UPDATE users SET name=?, username=?, position=?, department=? where id= ?";
	db.query(
		sqlUpdate,
		[name, username, position, department, id],
		(err, result) => {
			res.json(
				err
					? ToastRes("error", "updating user")
					: ToastRes("update", `User: ${username}`)
			);
		}
	);
}

function deleteUser(req, res, db) {
	const id = req?.body.user_id;
	const sqlDelete = "DELETE from users where id= ?";
	db.query(sqlDelete, [id], (err, result) => {
		res.json(
			err
				? ToastRes("error", "deleting user")
				: ToastRes("delete", `User: ${id}`)
		);
	});
}

module.exports.verifyLogin = verifyLogin;
module.exports.getUsers = getUsers;
module.exports.enableUser = enableUser;
module.exports.disableUser = disableUser;
module.exports.resetPassword = resetPassword;
module.exports.register = register;
module.exports.updateInfo = updateInfo;
module.exports.deleteUser = deleteUser;
