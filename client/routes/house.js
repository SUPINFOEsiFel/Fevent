Router.route('/house/:_id', {
    name: 'houseShow',
    template: 'houseShow',
    data: function() {
        return {
            house: Houses.findOne({_id: this.params._id})
        }
    },
    waitOn: function() {
        return [
            Meteor.subscribe('houses')
        ];
    }
});

Router.route('/houses', {
    name: 'houses',
    template: 'houses',
    waitOn: function() {
        return [
            Meteor.subscribe('houses')
        ];
    }
});