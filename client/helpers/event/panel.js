Template.eventPanel.helpers({
    empty: function() {
        return Events.find().count() === 0;
    },
    length: function() {
        return Events.find().count();
    },
    events: function() {
        return Events.find({}, {
            sort: {
                date: -1
            }
        });
    }
});