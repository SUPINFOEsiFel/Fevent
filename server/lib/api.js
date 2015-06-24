var base64Img = Meteor.npmRequire('base64-img');
var fs = Meteor.npmRequire('fs');
var path = Meteor.npmRequire('path');

restivusInit = function() {
    Restivus.configure({
        useAuth: true
    });

    // Events
    var EVENT_404 = {
        statusCode: 404,
        body: {
            status: 'fail',
            message: 'Event not found'
        }
    };

    Restivus.addRoute('event/:id', {
        get: {
            authRequired: false,
            action: function() {
                var event = Events.findOne(this.urlParams.id);

                if (event) {
                    return {
                        status: 'success',
                        data: event
                    };
                }

                return EVENT_404;
            }
        },
        delete: {
            authRequired: true,
            roleRequired: 'admin',
            action: function() {
                var event = Events.findOne(this.urlParams.id);

                if (!event || event.groupId != this.user.groupId) {
                    return EVENT_404;
                }

                if (Events.remove(this.urlParams.id)) {
                    return {
                        statusCode: 204
                    };
                }

                return {
                    statusCode: 500,
                    body: {
                        status: 'fail',
                        message: 'Unable to delete the event'
                    }
                };
            }
        }
    });

    var requiredFields = ['name', 'begin', 'end', 'price', 'address', 'zipCode', 'city', 'country', 'link', 'comment', 'image'];

    Restivus.addRoute('event', {
        post: {
            authRequired: true,
            roleRequired: ['admin', 'super-admin'],
            action: function() {
                var self = this;
                var errors = [];

                requiredFields.forEach(function(requiredField) {
                    if (!(requiredField in self.bodyParams)) {
                        errors.push('Field "' + requiredField + '" required');
                    }
                });

                Object.keys(this.bodyParams).forEach(function(field) {
                    if (!_.contains(requiredFields, field)) {
                        errors.push('Invalid field "' + field + '"');
                    }
                });

                if (errors.length !== 0) {
                    return {
                        statusCode: 400,
                        status: 'fail',
                        message: errors.join('. ')
                    };
                }

                this.bodyParams.groupId = this.user.groupId;
                this.bodyParams.date = new Date();

                var image = this.bodyParams.image;
                delete this.bodyParams.image;

                var id = Events.insert(this.bodyParams);

                if (id) {
                    // Create image
                    base64Img.imgSync(image, UPLOAD_FULL_PATH, id);
                    var files = fs.readdirSync(UPLOAD_FULL_PATH);
                    var imageExtension = null;

                    files.forEach(function (file) {
                        if (file.lastIndexOf(id, 0) === 0) {
                            imageExtension = path.extname(file);

                            return false;
                        }
                    });

                    Events.update(id, {
                        $set: {
                            imageExtension: imageExtension
                        }
                    });

                    return {
                        statusCode: 200,
                        status: 'success',
                        id: id
                    }
                }

                return {
                    statusCode: 500,
                    body: {
                        status: 'fail',
                        message: 'Unable to save the event'
                    }
                };
            }
        }
    });

    Restivus.addRoute('events', {
        get: {
            authRequired: false,
            action: function () {
                var events = Events.find().fetch();

                return {
                    status: 'success',
                    events: events
                };
            }
        }
    });
};
