var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    addEvent: function(values) {
        checkAdmin();

        values.imageExtension = values.picture
            ? path.extname(UPLOAD_FULL_PATH + values.picture)
            : null;

        var id = Events.insert({
            date: new Date(),
            name: values.name,
            begin: values.begin,
            end: values.end,
            price: values.price,
            address: values.address,
            zipCode: values['zip-code'],
            city: values.city,
            country: values.country,
            link: values.link,
            comment: values.comment,
            imageExtension: values.imageExtension
        });

        fs.exists(UPLOAD_FULL_PATH + values.picture, function (exists) {
            if (exists) {
                fs.rename(UPLOAD_FULL_PATH + values.picture, UPLOAD_FULL_PATH + id + values.imageExtension, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    },
    editEvent: function(values) {
        checkAdmin();

        var event = Events.findOne(values.id);

        var data = {
            name:       values.name,
            begin:      values.begin,
            end:        values.end,
            price:      values.price,
            address:    values.address,
            zipCode:    values['zip-code'],
            city:       values.city,
            country:    values.country,
            link:       values.link,
            comment:    values.comment
        };

        if (values.picture) {
            data.imageExtension = path.extname(UPLOAD_FULL_PATH + values.picture);
        }

        Events.update(event._id, {
            $set: data
        });

        if (values.picture) {
            fs.exists(UPLOAD_FULL_PATH + event._id + event.imageExtension, function (exists) {
                if (exists) {
                    fs.unlink(UPLOAD_FULL_PATH + event._id + event.imageExtension, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });

            fs.exists(UPLOAD_FULL_PATH + values.picture, function (exists) {
                if (exists) {
                    fs.rename(UPLOAD_FULL_PATH + values.picture, UPLOAD_FULL_PATH + event._id + data.imageExtension, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    },
    removeEvent: function(id) {
        checkAdmin();

        var event = Events.findOne(id);

        if (!event) {
            throw new Error('Not found', 404);
        }

        Events.remove(id);

        fs.exists(UPLOAD_FULL_PATH + event._id + event.imageExtension, function (exists) {
            if (exists) {
                fs.unlink(UPLOAD_FULL_PATH + event._id + event.imageExtension, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    }
});
