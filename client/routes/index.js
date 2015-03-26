Router.route('/', {
    name: 'index',
    template: 'index',
    waitOn: function() {
        return [
            //Meteor.subscribe('events')
        ];
    }
});
