Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.render('index');
    } else if (Roles.userIsInRole(Meteor.userId(), Role.ADMIN)) {
        this.next();
    } else {
        this.render('unauthorized');
    }
});
