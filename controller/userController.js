import Owner from "../model/owner.js";
import Trainee from "../model/trainee.js";
import User from "../model/user.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const secret =
  "aljfaoiwebs-sfasdflaskwejsnsadfslknfsdbubaeanajfkejkasdownesdowerna";

export const signupownController = async (req, res) => {
  try {
    const data = req.body;
    let check = await User.findOne({ username: data.username });
    if (check) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedpass = await bcrypt.hash(data.password, 10);
    data.password = hashedpass;
    data.role = "owner";

    const newOwner = new Owner();
    newOwner.plans = [];
    newOwner.members = [];
    await newOwner.save();

    data.refId = newOwner._id;
    const newuser = new User(data);
    await newuser.save();

    const token = jwt.sign(
      { id: newuser._id, role: data.role, refId: data.refId },
      secret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "Account Created Successfully" ,token});
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

export const signuptrnController = async (req, res) => {
  try {
    const data = req.body;
    let check = await User.findOne({ username: data.username });
    if (check) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedpass = await bcrypt.hash(data.password, 10);
    data.password = hashedpass;
    data.role = "trainee";

    const newtrainee = new Trainee();
    data.refId = newtrainee._id;
    await newtrainee.save();

    const newuser = new User(data);
    await newuser.save();

     const token = jwt.sign(
      { id: newuser._id, role: data.role, refId: data.refId },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Account Created Successfully", token});
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

export const loginController = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ username: data.username });

    if (!user) {
      return res.status(404).json({ error: "Username is not found" });
    }

    const check = await bcrypt.compare(data.password, user.password);
    if (!check) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, refId: user.refId },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ msg: user.role, token });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
