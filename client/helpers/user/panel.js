Template.userPanel.helpers({
    empty: function() {
        return Meteor.users.find().count() === 0;
    },
    length: function() {
        return Meteor.users.find().count();
    },
    users: function() {
        return Meteor.users.find({}, {
            sort: {
                username: 1
            }
        });
    }
});
