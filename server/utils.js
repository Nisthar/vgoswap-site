const path = require('path');
const database = require(path.join(__dirname, 'database', 'database.js'));
const tradeHandler = require(path.join(__dirname, 'trade-handler'));

module.exports = {
	getIsoString: function () {
		return new Date().toISOString().split('.')[0] + "Z";
	},
	updateHomeStats: function(cb) {
		database.getTotalTrades((err, trades) => {
			if (err) {
				cb(err);
			} else {
				database.getTotalUsers((err, users) => {
					if (err) {
						cb(err);
					} else {
						cb(null, {
							totalTrades: trades,
							totalUsers: users
						});
					}
				});
			}
		});
	},
	updateInStock: function (cb) {
		database.getTf2KeysInStock((err, tf2) => {
			if (err) {
				cb(err);
			} else {
				tradeHandler.getBotVgoKeys((err, vgo) => {
					if (err) {
						cb(err);
					} else {
						cb(null, {
							tf2: tf2,
							vgo: vgo.length
						});
					}
				});
			}
		});
	}
}