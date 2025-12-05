import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET;

export interface UserSession {
	userId: number;
	username?: string;
	firstName: string;
	lastName?: string;
	gateId: string;
}

interface DecodedToken {
	userId: number;
	username?: string;
	firstName: string;
	lastName?: string;
	gateId: string;
	iat: number;
	exp: number;
}

export function verifyGatekeeperToken(token: string): UserSession | null {
	if (!AUTH_SECRET) {
		console.error("AUTH_SECRET is not defined");
		return null;
	}
	try {
		const decoded = jwt.verify(token, AUTH_SECRET) as DecodedToken;
		return {
			userId: decoded.userId,
			username: decoded.username,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			gateId: decoded.gateId,
		};
	} catch (e) {
		console.error("Invalid token:", e);
		return null;
	}
}
