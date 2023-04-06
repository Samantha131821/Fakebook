const bcrypt = require('bcrypt');

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
