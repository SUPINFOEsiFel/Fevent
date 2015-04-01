checkAdmin = function() {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.user(), Role.ADMIN) || !Roles.userIsInRole(Meteor.user(), Role.SUPER_ADMIN)) {
        throw new Meteor.Error('not-authorized');
    }
};
