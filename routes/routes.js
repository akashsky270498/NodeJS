const router = require("express").Router();
const { register, login, updateUserById, deleteUserById, getAllUsers, getUserById, otpCheck, getAllStudents, resetPassword } = require("../controllers/userController");
const { authUpdate, authUsers, authDelete } = require("../middlewares/auth");
const passport = require("passport");
const userController = require("../controllers/userController")
const verify = require('../jwt/verify');

//SWAGGER_Register
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/** 
* @swagger
* /api/auth/users:
*   get:
*     summary: List all users.
*     description: Display all the Registered User.
*     tags: [User]
*     produces:
*       - application/json
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: All Users....
*       401:
*         description: Unauthorized....
*/

router.get("/users", authUsers, userController.getAllUsers);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a New User.
 *     description: Create and Store a New User in the Database.
 *     security:
 *        - BearerAuth: []
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               status:
 *                 type: string
 *               role:
 *                 type: string               
 *     responses:
 *       200:
 *         description: User created Successfully....
 *       400:
 *         description: Bad request
 */

router.post('/register', userController.register);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login User.
 *     description: Verify the Registered User.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Successfully logged in.
 *       400:
 *         description: Bad request
 */
router.route("/login").post(login);


//GET_USER_BY_ID

/**
   * @swagger
   * /api/auth/user/{id}:
   *   get:
   *     summary: Get User by Id
   *     tags: [User]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *             _id: 
   *                type: string
   *                example: 64127bc08489fc8389387355
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Numeric ID required  
   *     responses:
   *       200:
   *         description: Get User by Id....
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized....
   */
router.route('/user/:_id').get(getUserById);

//OTP_CHECK


/**
 * @swagger
 * /api/auth/otp:
 *   get:
 *     summary: OTP Check
 *     tags: [User]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: [] 
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *             otp: 
 *                type: integer
 *                example: 1234
 *     parameters:
 *        - in: query
 *          name: otp
 *          required: true
 *          description: OTP required  
 *     responses:
 *       200:
 *         description: Success....
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized....
 */
router.route('/otp').get(otpCheck);

/**
   * @swagger
   * /api/auth/update/{id}:
   *   put:
   *     summary: Update User by Id.
   *     description: Update the User Stored Data.
   *     tags: [User]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *               _id: 
   *                  type: string
   *                  example : 64127bc08489fc8389387355
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Numeric ID required  
   *     responses:
   *       200:
   *         description: Updated User by Id. 
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized....
*/
router.route("/update/:_id").put(authUpdate, updateUserById);


/**
   * @swagger
   * /api/auth/reset-password/{id}:
   *   put:
   *     summary: Reset Password.
   *     description: Using this you can reset your Password.
   *     tags: [User]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *               _id: 
   *                  type: string
   *                  example : 64127bc08489fc8389387355
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Numeric ID required  
   *     responses:
   *       200:
   *         description: Updated User by Id. 
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized....
*/
router.route('/reset-password/:_id').put(resetPassword);


/**
   * @swagger
   * /api/auth/delete/{id}:
   *   delete:
   *     summary: Delete User by Id.
   *     description: Delete the User Stored Data.
   *     tags: [User]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *             _id: 
   *                type: string
   *                example: 64127bc08489fc8389387355
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          description: Numeric ID required  
   *     responses:
   *       200:
   *         description: Get User by Id....
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized....
   */

router.delete("/delete/:_id", authDelete, userController.deleteUserById)

module.exports = router;





