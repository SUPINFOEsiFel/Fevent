var fs = Npm.require('fs');
var DIR = process.env.PWD + UPLOAD_DIR + '/';

Meteor.methods({
    addEvent: function(values) {
        //checkAdmin();

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
            comment: values.comment
        });

        fs.exists(DIR + values.picture, function (exists) {
            if (exists) {
                fs.rename(DIR + values.picture, DIR + id, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    },
    editEvent: function(values) {
        //checkAdmin();

        var event = Events.findOne(values.id);

        Events.update(event._id, {
            $set: {
                name:       values.name,
                begin:      values.begin,
                end:        values.end,
                price:      values.price,
                address:    values.address,
                zipCode:    values['zip-code'],
                city:       values.city,
                country:    values.country,
                link:       values.link,
                picture:    values.picture,
                comment:    values.comment
            }
        });

        fs.exists(DIR + event._id, function (exists) {
            if (exists) {
                fs.unlink(DIR + event._id, function (err) {
                    if (err) throw err;
                });
            }
        });

        fs.exists(DIR + values.picture, function (exists) {
            if (exists) {
                fs.rename(DIR + values.picture, DIR + event._id, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        });
    },
    removeEvent: function(id) {
        //checkAdmin();

        var event = Events.findOne(id);

        if (!event) {
            throw new Error('Not found', 404);
        }

        Events.remove(id);

        fs.exists(DIR + event._id, function (exists) {
            if (exists) {
                fs.unlink(dirPublic + event._id, function (err) {
                    if (err) throw err;
                });
            }
        });
    }
});
