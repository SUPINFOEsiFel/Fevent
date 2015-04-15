/**
 * @api {get} /logout Logout
 * @apiVersion 0.0.1
 * @apiName Logout
 * @apiGroup User
 *
 * @apiExample {curl} Example usage:
 *     curl fevent.meteor.com/api/logout -H "X-Auth-Token: kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy" \
 *     -H "X-User-Id: hCGMbYWxqWHKoEuth"
 *
 * @apiHeader {String} X-Auth-Token User auth token
 * @apiHeader {String} X-User-Id    User ID
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} data    Success message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": {
 *             "message": "You've been logged out!"
 *         }
 *     }
 *
 * @apiError UserUnauthorized You are not logged in.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "status": "error",
 *         "message": "You must be logged in to do this."
 *     }
 */
