import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
        // eslint-disable-next-line no-undef
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// eslint-disable-next-line no-undef
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // eslint-disable-next-line no-undef
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;