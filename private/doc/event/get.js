/**
 * @api {get} /event/:id Request event informations
 * @apiVersion 0.0.1
 * @apiName GetEvent
 * @apiGroup Event
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET fevent.meteor.com/api/event/XbGwBxK9hc2NGeoi2 \
 *     -H "X-Auth-Token: kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy" \
 *     -H "X-User-Id: hCGMbYWxqWHKoEuth"
 *
 * @apiHeader {String} X-Auth-Token User auth token
 * @apiHeader {String} X-User-Id    User ID
 *
 * @apiParam {String} id Event ID
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} data    Event informations
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": {
 *             "_id": "XbGwBxK9hc2NGeoi2",
 *             "title": "Event title",
 *             "description": "Event description",
 *             // ...
 *             "imageExtension": ".jpg"
 *         }
 *     }
 *
 * @apiError EventNotFound The ID of the event was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "status": "fail",
 *         "message": "Item not found"
 *     }
 */
