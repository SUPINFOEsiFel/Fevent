Meteor.publish('groups', function() {
    if (!this.userId) return [];

    return Groups.find();
});
