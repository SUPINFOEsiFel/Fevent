Template.admin.helpers({
    superAdmin: function() {
        return (Meteor.userId() && Roles.userIsInRole(Meteor.user(), Role.SUPER_ADMIN));
    }
});