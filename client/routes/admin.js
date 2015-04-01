Router.route('/admin', {
    name: 'admin',
    template: 'admin',
    waitOn: function() {
        return [
            Meteor.subscribe('events')
        ];
    }
});
