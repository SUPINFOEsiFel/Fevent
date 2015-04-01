Meteor.publish('events', function() {
    if (!this.userId) return [];

    return Events.find();
});
