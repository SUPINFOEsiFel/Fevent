var fs = Npm.require('fs');
var dir = process.env.PWD + '/.uploads/img/';
var dirPublic = process.env.PWD + '/public/uploads/';

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

        fs.rename(dir + values.picture, dirPublic + id, function (err) {
            if (err) throw err;
        });

    },
    editEvent: function(values) {
        //checkAdmin();

        var event = Events.findOne(values.id);

        Events.update(event._id, {
            $set: {
                name: values.name,
                begin: values.begin,
                end: values.end,
                price: values.price,
                address: values.address,
                zipCode: values['zip-code'],
                city: values.city,
                country: values.country,
                link: values.link,
                picture: values.picture,
                comment: values.comment
            }
        });

        fs.unlink(dirPublic + event._id, function (err) {
            if (err) throw err;
        });
        fs.rename(dir + values.picture, dirPublic + event._id, function (err) {
            if (err) throw err;
        });
    },
    removeEvent: function(id) {
        //checkAdmin();

        var event = Events.findOne(id);

        Events.remove(id);
        fs.unlink(dirPublic + event._id, function (err) {
            if (err) throw err;
        });
    }
});
