/**
 * @api {post} /event Create event
 * @apiVersion 0.0.1
 * @apiName AddEvent
 * @apiGroup Event
 *
 * @apiExample {curl} Example usage:
 *     curl -X POST fevent.meteor.com/api/event \
 *     -H "X-Auth-Token: kpViNy6GFySoZymr00iVxxLHfyj10w6x9Mfee_WEvTy" \
 *     -H "X-User-Id: hCGMbYWxqWHKoEuth" \
 *     -d "name=Event&comment=Description&image=data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABA..."
 *
 * @apiHeader {String} X-Auth-Token User auth token
 * @apiHeader {String} X-User-Id    User ID
 *
 * @apiParam {String}   name        Name of the event
 * @apiParam {Date}     begin       Begin date
 * @apiParam {Date}     end         Ending date
 * @apiParam {Double}   price       Price of the event
 * @apiParam {String}   address     Address where the event takes place
 * @apiParam {String}   zipCode     ZIP code
 * @apiParam {String}   city        City
 * @apiParam {String}   country     Country
 * @apiParam {String}   link        Link to a website or to a page
 * @apiParam {String}   comment     Description of the event
 * @apiParam {String}   image       Format: "data:[MIME_TYPE];base64,[BASE64]". You have to replace "[MIME_TYPE]" with
 *                                  the image MIME type and "[BASE64]" with the base64 encoded image file.
 *
 * @apiSuccess {String} status  Request result
 * @apiSuccess {Object} id      Event ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "status": "success",
 *         "data": {
 *             "_id": "XbGwBxK9hc2NGeoi2",
 *             "name": "Event title",
 *             "description": "Event description"
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
