Meteor.publish('users', function() {
    if (!this.userId) return [];

    return Meteor.users.find({}, {
        fields: {
            username: 1,
            emails: 1,
            roles: 1
        }
    });
});
