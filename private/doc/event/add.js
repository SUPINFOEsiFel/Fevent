/**
 * @api {post} /event Create event
 * @apiVersion 0.0.1
 * @apiName AddEvent
 * @apiGroup Event
 *
 * @apiExample {curl} Example usage:
 *     curl -X GET fevent.meteor.com/api/event \
 *     -H "X-Auth-Token: kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy" \
 *     -H "X-User-Id: hCGMbYWxqWHKoEuth"
 *
 * @apiHeader {String} X-Auth-Token User auth token
 * @apiHeader {String} X-User-Id    User ID
 *
 * @apiParam {String}   name
 * @apiParam {Date}     begin
 * @apiParam {Date}     end
 * @apiParam {Double}   price
 * @apiParam {String}   address
 * @apiParam {String}   zipCode
 * @apiParam {String}   city
 * @apiParam {String}   country
 * @apiParam {String}   link
 * @apiParam {String}   comment
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} id      Event id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": {
 *             "_id": "XbGwBxK9hc2NGeoi2",
 *             "title": "Event title",
 *             "description": "Event description"
 *         }
 *     }
 *
 * @apiError EventNotFound The id of the event was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "status": "fail",
 *         "message": "Item not found"
 *     }
 */
