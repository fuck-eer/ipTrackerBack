const isAuth = (req, res, next) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		return res.status(401).json({ error: "Not authorized/No token found" });
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "Not authorized/fake token found" });
	}

	if (token.length !== 13) {
		return res.status(401).json({ error: "Not authorized/fake token found" });
	}
	req.userId = token;
	next();
};

module.exports = isAuth;
