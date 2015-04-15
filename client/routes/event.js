Router.route('/event/:_id', {
    name: 'eventShow',
    template: 'eventShow',
    data: function() {
        return {
            event: Events.findOne({_id: this.params._id})
        }
    },
    waitOn: function() {
        return [
            Meteor.subscribe('events')
        ];
    }
});