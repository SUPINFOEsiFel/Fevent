/**
 * @api {post} /login Login to the API
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl fevent.meteor.com/api/login/ -d "user=myUsername&password=myPassword"
 *
 * @apiParam {String} user      Username
 * @apiParam {String} password  Password
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} data    User informations
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": {
 *             "authToken": "kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy",
 *             "userId": "hCGMbYWxqWHKoEuth"
 *         }
 *     }
 *
 * @apiError UserForbidden User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *         "status": "error",
 *         "message": "User not found"
 *     }
 */
