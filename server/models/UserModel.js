const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	phone_number: {
		type: {
			countryCode: {
				type: String,
				required: true,
			},
			number: {
				type: String,
				required: true,
			},
		},
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	isPremium: {
		type: Boolean,
		required: false,
		default: false,
	},
	password: {
		type: String,
		required: true,
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
