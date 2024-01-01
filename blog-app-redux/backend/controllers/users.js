const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3) {
    console.log("Your username must be at least 3 characters long");
    return response
      .status(401)
      .json("Your username must be at least 3 characters long");
  }

  if (password.length < 3) {
    console.log("Your password must be at least 3 characters long");
    return response
      .status(401)
      .json("Your password must be at least 3 characters long");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    response.status(200).json(user);
  } else {
    response.status(404).end();
  }
});

module.exports = usersRouter;
