var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    addEvent: function(values) {
        checkAdmin();
        addEventValidation(values);

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
        editEventValidation(values);

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

function editEventValidation (values) {
    if(!values.name)
        throw new Meteor.Error(400, 'Ce nom est invalide');
    if(!values.begin)
        throw new Meteor.Error(400, 'La date de départ est invalide');
    if(!values.end)
        throw new Meteor.Error(400, 'La date de fin est invalide');
    if(!values.price)
        throw new Meteor.Error(400, 'Ce prix est invalide');
    if(!values.address)
        throw new Meteor.Error(400, 'Cette adresse est invalide');
    if(!values.city)
        throw new Meteor.Error(400, 'Cette ville est invalide');
    if(!values['zip-code'])
        throw new Meteor.Error(400, 'Ce code postal est invalide');
    if(!values.comment)
        throw new Meteor.Error(400, 'Ce commentaire est invalide');
    if(!values.picture)
        throw new Meteor.Error(400, 'L\'image n\'a pas été upload ou n\'est pas valide');
}

function addEventValidation (values) {
    editEventValidation(values);
}
