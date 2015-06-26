Router.route('/admin', {
    name: 'admin',
    template: 'admin',
    waitOn: function() {
        return [
            Meteor.subscribe('events'),
            Meteor.subscribe('users'),
            Meteor.subscribe('groups'),
            Meteor.subscribe('houses')
        ];
    }
});

Iron.Router.hooks.checkAdmin = function() {
    if (!Meteor.userId()) {
        this.render('index');
    } else {
        if (!Roles.userIsInRole(Meteor.user(), Role.ADMIN) && !Roles.userIsInRole(Meteor.user(), Role.SUPER_ADMIN)) {
            throw new Meteor.Error('Vous n\'êtes pas autorisé !');
        }
        this.next();
    }

};

Router.onBeforeAction('checkAdmin', {
    only: ['admin']
});
