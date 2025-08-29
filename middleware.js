import jwt from "jsonwebtoken";

const secret =
  "aljfaoiwebs-sfasdflaskwejsnsadfslknfsdbubaeanajfkejkasdownesdowerna";

export const checkToken = async(req, res, next) => {

  try {
    const authheaders = req.headers.authorization;

    if (!authheaders) return res.status(401).json({ error: "Token missing" });

    const token = authheaders.split(" ")[1];
    let valid = jwt.verify(token, secret);
    req.user = valid;
    console.log("Current User: ", req.user);
    next();

  } catch (e) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
