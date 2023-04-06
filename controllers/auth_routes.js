const express = require('express');
const { newUser, login, logout } = require('./api/auth');
const router = require('express').Router();

router.post("/newUser", newUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router