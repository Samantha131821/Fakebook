const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create new user
const newUser = (req, res) => {
  // Check if user already exist
  const q = "SELECT * FROM users WHERE email = ? or username = ?";

  db.query(q, [res.body.email, req.body.username], (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (user.length) {
      return res.status(400).json('User already exist')
    }

    // Hide the password 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, user) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json('Your account has been successfully created!')
      }
    });
  });
};

const login = (req, res) => {
  // Check if user exist
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, user) => {
    if (err) return res.status(500).json(err);
    if (user.length === 0) return res.status(404).json("User not found!");

    // Check if the password is correct
    const correctPassword = bcrypt.compareSync(req.body.password, user[0].password);

    if (!correctPassword)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: user[0].id }, "jwtkey");
    const { password, ...other } = user[0];

    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};

module.exports = {newUser, login, logout};