const express = require("express");
const {  userRegister, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUser, updateRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');



const router = express.Router();


router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/profile/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateRole).delete( isAuthenticatedUser,authorizeRoles("admin"),deleteUser);





module.exports = router;