Meteor.methods({
    addGroup: function(values) {
        checkSuper();

        Groups.insert({
            name: values.name
        });
    },
    editGroup: function(values) {
        checkSuper();

        Groups.update(values.id, {
            $set: {
                name: values.name
            }
        });
    },
    removeGroup: function(id) {
        checkSuper();

        Groups.remove(id);
    }
});
