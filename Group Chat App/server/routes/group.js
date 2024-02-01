const express = require("express");

const router = express.Router();
const userAuthentication = require("../middleware/auth");

const groupController = require("../controllers/group");

router.post(
	"/create-group",
	userAuthentication.authenticate,
	groupController.createGroup
);

router.post(
	"/make-admin",
	userAuthentication.authenticate,
	groupController.makeAdmin
);

router.post(
	"/delete-user",
	userAuthentication.authenticate,
	groupController.deleteUser
);

router.post('/add-user', userAuthentication.authenticate, groupController.addUserToGroup);

router.get(
	"/get-groups",
	userAuthentication.authenticate,
	groupController.getGroups
);

router.get(
	"/get-group-by-id/:gId",
	userAuthentication.authenticate,
	groupController.getGroupById
);

router.get(
	"/get-users",
	userAuthentication.authenticate,
	groupController.getUsers
);

router.delete(
	"/delete-group/:gId",
	userAuthentication.authenticate,
	groupController.deleteGroup
);

module.exports = router;
