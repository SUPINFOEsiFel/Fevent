Meteor.methods({
    addEvent: function(values) {
        //checkAdmin();

        Events.insert({
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
        });
    },
    editEvent: function(values) {
        //checkAdmin();

        Events.update(values.id, {
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
    },
    removeEvent: function(id) {
        //checkAdmin();

        Events.remove(id);
    }
});
