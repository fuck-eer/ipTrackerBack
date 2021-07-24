const StoredIP = require("../models/StoredIP");

exports.getIpData = (req, res, next) => {
	StoredIP.findOne({ userId: req.userId })
		.then((e) => {
			if (!e) {
				return res
					.status(404)
					.json({ msg: "not saved history found", storedIps: [] });
			}
			return res.status(200).json(e);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
};

exports.findIp = (req, res, next) => {
	StoredIP.findOne({ userId: req.userId })
		.then((e) => {
			if (!e) {
				return res.status(404).json({ msg: "userNotFound" });
			}
			console.log(req.params.ip);
			const indx = e.storedIps.findIndex((el) => el.ipadd === req.params.ip);

			if (indx === -1) {
				return res.status(200).json({ msg: 0 });
			}
			return res.status(200).json({ msg: 1 });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.saveIpData = (req, res, next) => {
	const ip = req.body.ip;
	const tag = req.body.city;

	StoredIP.findOne({ userId: req.userId })
		.then((e) => {
			if (!e) {
				const user = new StoredIP({
					userId: req.userId,
					storedIps: [
						{
							ipadd: ip,
							tag: tag,
						},
					],
				});

				return user.save();
			}
			const ips = [...e.storedIps, { ipadd: ip, tag: tag }];

			e.storedIps = ips;

			return e.save();
		})
		.then((e) => {
			return res.status(200).json(e);
		})
		.catch((err) => {
			console.log(err);
		});
};
