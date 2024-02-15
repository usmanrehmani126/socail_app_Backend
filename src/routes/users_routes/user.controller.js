const UserModal = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    let checkUser = await UserModal.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (!checkUser) {
      const salt = await bcrypt.genSalt();
      const passowrdHash = await bcrypt.hash(password, salt);

      let result = await UserModal.create({
        ...req.body,
        password: passowrdHash,
      });

      // const token = jwt.sign({ user_id: result?._id, email }, process.env.TOKEN_KEY);
      // result.token = token

      res.send({
        data: result,
        message: "User created succesfully...!!!",
        status: true,
      });
    } else {
      res.status(403).json({ status: false, message: "user already exist" });
    }
  } catch (error) {
    console.log("error raised", error);
    res.status(403).json({ status: false, error: error });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await UserModal.findOne({ email: email });
    if (!!result) {
      let isPasswordValid = await bcrypt.compare(password, result.password);
      if (!!isPasswordValid) {
        const token = jwt.sign(
          { user_id: result?._id, email },
          process.env.TOKEN_KEY
        );

        const deepCopy = JSON.parse(JSON.stringify(result));
        deepCopy.token = token;
        delete deepCopy.password;

        res.send({
          data: deepCopy,
          status: true,
        });
      } else {
        res
          .status(403)
          .json({ status: false, error: "Password/email not correct" });
      }
    } else {
      res
        .status(403)
        .json({ status: false, error: "Password/email not correct" });
    }
  } catch (error) {
    res.status(403).json({ status: false, error: error });
  }
};
const otpVerify = async (req, res) => {
  const { email, otp } = req.body;
  if (otp === "1234") {
    try {
      const result = await UserModal.findOneAndUpdate(
        { email: email },
        { $set: { validOTP:true} },
        { new: true }
      ).select("-password");
      if (!!result) {
        res.send({
          data: result,
          status: true,
        });
      } else {
        res.status(403).json({ status: false, error: "User not found" });
      }
    } catch (error) {
      res.status(403).json({ status: false, error: error });
    }
  } else {
    res.status(403).json({ status: false, error: "OTP is not valid" });
  }
};
module.exports = {
  createUser,
  loginUser,
  otpVerify,
};
