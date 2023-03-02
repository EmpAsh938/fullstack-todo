const mongoose = require("mongoose");

const isValidId = (id) => {
	let ObjectId = mongoose.Types.ObjectId;
	return ObjectId.isValid(id);
}

module.exports = isValidId;