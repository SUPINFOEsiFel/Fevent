Template.housePanel.helpers({
    empty: function() {
        return Houses.find().count() === 0;
    },
    length: function() {
        return Houses.find().count();
    },
    houses: function() {
        return Houses.find();
    }
});