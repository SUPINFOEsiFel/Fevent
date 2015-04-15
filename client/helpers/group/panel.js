Template.groupPanel.helpers({
    empty: function() {
        return Groups.find().count() === 0;
    },
    length: function() {
        return Groups.find().count();
    },
    groups: function() {
        return Groups.find();
    }
});