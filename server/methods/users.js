Meteor.methods({
    addUser: function(values) {
        checkSuper();

        var id = Accounts.createUser({
            username: values.username,
            email: values.email,
            password: values.password
        });

        Roles.addUsersToRoles(id, Role.ADMIN);
    },
    editUser: function(values) {
        checkSuper();

        Meteor.users.update(values.id, {
            $set: {
                username: values.username,
                'emails.0.address': values.email
            }
        });
    },
    removeUser: function(id) {
        checkSuper();

        Meteor.users.remove(id);
    }
});
