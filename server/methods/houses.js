var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    addHouse: function(values) {
        checkAdmin();
        addHouseValidation(values);

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
        editHouseValidation(values);

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

function editHouseValidation (values) {
    if(!values.name)
        throw new Meteor.Error(400, 'Ce nom est invalide');
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

function addHouseValidation (values) {
    editHouseValidation(values);
}
