const jwt = require("jsonwebtoken");
 
exports.generateToken = (id, role) => {
    if (role === "Admin") {
        let data = {
            permission: ["01"],
            role: "Admin",
            id: id,
        };
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } else if (role === "Manager") {
        let data = {
            permission: ["02", "03"],
            role: "Manager",
            id: id,
        };
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } else if (role === "Worker") {
        let data = {
            permission: ["02"],
            role: "Worker",
            id: id,
        };
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    }
};