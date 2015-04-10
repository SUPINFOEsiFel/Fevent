Template.index.helpers({
    events: function() {
        return Events.find({}, {
            sort: {
                date: -1
            }
        });
    }
});