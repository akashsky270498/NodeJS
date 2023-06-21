const fs = require("fs");
const path = require("path");

exports.readFile = async(req, res) => {

    const filepath = path.join('D:\\myTask', 'Training.pdf');

    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', 'inline; filename=Training.pdf');

    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
}
