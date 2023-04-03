function verifyLogin(req, res, db) {
    //console.log("verify login")
    const username = req.query.username;
    const password = req.query.password;
    //console.log(email, password)
    const get_user =
        "select id, position, password, enabled from users where username = ?";
    db.query(get_user, [username], (err, result) => {
        if (result.length === 0) {
            console.log("No user found");
            res.send("No user found");
        } else if (result[0].enabled === 0) {
            console.log("User is disabled");
            res.send("User is disabled");
        } else if (password === result[0].password) {
            res.send({
                id: result[0].id,
                position: result[0].position,
            });
        } else {
            console.log("wrong password");
            res.send("wrong password");
        }
        //res.send(result)
    });
    return res;
}

function getusers(req, res, db) {
    const sqlSelect = "SELECT * from users";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function enableUser(req, res, db) {
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=1 where id= ?";
    db.query(sqlUpdate, [id], (err, result) => {
        if (err) console.log(err);

        res.send(result);
    });
}

function disableuser(req, res, db) {
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=0 where id= ?";
    db.query(sqlUpdate, [id], (err, result) => {
        if (err) console.log(err);

        res.send(result);
    });
}

function resetpassword(req, res, db) {
    const id = req.body.user_id;
    const password = req.body.new_password;
    console.log(id + " " + password);
    const sqlUpdate = "UPDATE users SET password=? where id= ?";
    db.query(sqlUpdate, [password, id], (err, result) => {
        if (err) console.log(err);

        res.send(result);
    });
}

function register(req, res, db) {
    //console.log("submit in backend");
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const position = req.body.position;
    const department = req.body.department;
    //console.log(name+" "+username+" "+password+" "+position+" "+department);
    const create_user =
        "INSERT INTO users (name, username, password, position, department, enabled) VALUES (?,?,?,?,?,0)";
    db.query(
        create_user,
        [name, username, password, position, department],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}

function updateinfo(req, res, db) {
    //console.log("update info in backend");
    const id = req.body.user_id;
    const name = req.body.new_name;
    const username = req.body.new_username;
    const position = req.body.new_position;
    const department = req.body.new_department;
    //console.log(name+" "+username+" "+password+" "+position+" "+department);
    const sqlUpdate =
        "UPDATE users SET name=?, username=?, position=?, department=? where id= ?";
    db.query(
        sqlUpdate,
        [name, username, position, department, id],
        (err, result) => {
            if (err) console.log(err);

            // res.send(result).json({
            //     success: true,
            // });
        }
    );
}

function deleteuser(req, res, db) {
    console.log("Delete info in backend");
    const id = req.body.user_id;
    const sqlDelete = "DELETE from users where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);

        if (!err) {
            res.send("success");
        }
    });
}

module.exports.verifyLogin = verifyLogin;
module.exports.getusers = getusers;
module.exports.enableUser = enableUser;
module.exports.disableuser = disableuser;
module.exports.resetpassword = resetpassword;
module.exports.register = register;
module.exports.updateinfo = updateinfo;
module.exports.deleteuser = deleteuser;
