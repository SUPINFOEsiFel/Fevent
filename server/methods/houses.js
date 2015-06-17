var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    addHouse: function(values) {
        checkAdmin();

        values.imageExtension = values.picture
            ? path.extname(UPLOAD_FULL_PATH + values.picture)
            : null;

        var id = Houses.insert({
            name: values.name,
            address: values.address,
            zipCode: values['zip-code'],
            city: values.city,
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
    editHouse: function(values) {
        checkAdmin();

        var house = Houses.findOne(values.id);

        var data = {
            name:       values.name,
            address:    values.address,
            zipCode:    values['zip-code'],
            city:       values.city,
            link:       values.link,
            comment:    values.comment
        };

        if (values.picture) {
            data.imageExtension = path.extname(UPLOAD_FULL_PATH + values.picture);
        }

        Houses.update(house._id, {
            $set: data
        });

        if (values.picture) {
            fs.exists(UPLOAD_FULL_PATH + house._id + house.imageExtension, function (exists) {
                if (exists) {
                    fs.unlink(UPLOAD_FULL_PATH + house._id + house.imageExtension, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });

            fs.exists(UPLOAD_FULL_PATH + values.picture, function (exists) {
                if (exists) {
                    fs.rename(UPLOAD_FULL_PATH + values.picture, UPLOAD_FULL_PATH + house._id + data.imageExtension, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    },
    removeHouse: function(id) {
        checkAdmin();

        var house = Houses.findOne(id);

        if (!house) {
            throw new Error('Not found', 404);
        }

        Houses.remove(id);

        fs.exists(UPLOAD_FULL_PATH + house._id + house.imageExtension, function (exists) {
            if (exists) {
                fs.unlink(UPLOAD_FULL_PATH + house._id + house.imageExtension, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    }
});
