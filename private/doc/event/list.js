/**
 * @api {get} /events Request events list
 * @apiVersion 0.0.1
 * @apiName GetEvents
 * @apiGroup Event
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET fevent.meteor.com/api/events \
 *     -H "X-Auth-Token: kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy" \
 *     -H "X-User-Id: hCGMbYWxqWHKoEuth"
 *
 * @apiHeader {String} X-Auth-Token User auth token
 * @apiHeader {String} X-User-Id    User ID
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} data    Events informations
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": [
 *             {
 *                 "_id": "XbGwBxK9hc2NGeoi2",
 *                 "title": "Event 1",
 *                 "description": "Event description"
 *             },
 *             {
 *                 "_id": "PgmZGfCo9afaanobf",
 *                 "title": "Event 2",
 *                 "description": "Event description"
 *             }
 *         ]
 *     }
 */
