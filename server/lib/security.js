checkAdmin = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error('Veuillez-vous connecter');
    } else {
        if (!Roles.userIsInRole(Meteor.user(), Role.ADMIN) && !Roles.userIsInRole(Meteor.user(), Role.SUPER_ADMIN)) {
            throw new Meteor.Error('Vous n\'êtes pas autorisé !');
        }
    }

};

checkSuper = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error('Veuillez-vous connecter');
    } else {
        if (!Roles.userIsInRole(Meteor.user(), Role.SUPER_ADMIN)) {
            throw new Meteor.Error('Vous n\'êtes pas autorisé !');
        }
    }
};
