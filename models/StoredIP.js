const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storedipModal = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	storedIps: [
		{
			ipadd: {
				type: String,
				required: true,
			},
			tag: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model("StoredIP", storedipModal);
