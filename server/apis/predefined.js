const multer = require("multer");
const { ToastRes } = require("./util");
var upload = multer({ dest: "uploads/" });

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./uploads"); // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        console.log("File Name : " + file.fieldname);
        callBack(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

function adddPredefined(req, res, db) {
    // const LV_name = req.body.LV_name;
    // const capacity = req.body.capacity;
    // const master_reg_number = req.body.master_reg_number;
    // const masters_name = req.body.masters_name;
    // const masters_contact_number = req.body.masters_contact_number;
    // const masters_nid_image_attachment_name = req.body.fileName;
    // get files from multer
    // const masters_nid_image_attachment = req.body.file;
    // const staff_name = req.body.staff_name;
    // const staff_nid_number = req.body.staff_nid_number;
    // const leased = req.body.leased;
    // const company_name = req.body.company_name;
    // const proprietors_name = req.body.proprietors_name;
    // const office_address = req.body.office_address;
    // const ac_number = req.body.ac_number;
    // const contact_details = req.body.contact_details;
    // sending null value for now
    // const lv_documents_attachement = "null";
    // const status = req.body.status;
    // var upload = multer({ storage: storage });
    // // getting file name and file but file not uploading
    // if (masters_nid_image_attachment != null) {
    //     console.log("Success");
    //     try {
    //         console.log("File Uploading");
    //         upload.single(masters_nid_image_attachment);
    //         res.send(masters_nid_image_attachment);
    //     } catch (error) {
    //         console.log("File Not Uploaded");
    //     }
    // } else {
    //     console.log("Failed");
    // }
    // const sqlCreate = `INSERT INTO pre_defined_ship (LV_name, capacity, master_reg_number, masters_name, masters_contact_number, masters_nid_image_attachment, staff_name, staff_nid_number, leased, company_name, proprietors_name, office_address, ac_number, contact_details, lv_documents_attachement, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // db.query(
    //     sqlCreate,
    //     [
    //         LV_name,
    //         capacity,
    //         master_reg_number,
    //         masters_name,
    //         masters_contact_number,
    //         masters_nid_image_attachment_name,
    //         staff_name,
    //         staff_nid_number,
    //         leased,
    //         company_name,
    //         proprietors_name,
    //         office_address,
    //         ac_number,
    //         contact_details,
    //         lv_documents_attachement,
    //         status,
    //     ],
    //     (err, result) => {
    //         res.json(
    //             err
    //                 ? ToastRes("error", "creating ship")
    //                 : ToastRes("create", `${LV_name}`)
    //         );
    //         console.log(err);
    //     }
    // );
}

function addPredefined(req, res, db) {
    const filename =
        Date.now() + "_" + req.files?.masters_nid_image_attachment.name;
    // const file = req.files.img;
    // let uploadPath = __dirname + "/uploads/" + filename;
    // file.mv(uploadPath, (err) => {
    //     if (err) {
    //         return res.send(Err);
    //     }
    // });
    // res.send(200);
    console.log(req?.files);
}

function getPredefined(req, res, db) {
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
    } = req.body;

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
    const id = req.body.status_id;
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
