const router = require("express").Router();
const userController = require("../controllers/searchController");
const { search } = require("../controllers/searchController");

//SWAGGER_Register
/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search User (Name-Role)
 */


/**
   * @swagger
   * /api/auth/search/{key}:
   *   get:
   *     summary: Get User Search Key
   *     tags: [Search]
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
   *          name: key
   *          required: true
   *          description: Search key required  
   *     responses:
   *       200:
   *         description: Get User by Search key....
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized....
   */

router.get('/search/:key', userController.search);

module.exports = router;

