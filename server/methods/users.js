Meteor.methods({
    addUser: function(values) {
        checkSuper();
        addUserValidation(values);

        var id = Accounts.createUser({
            username: values.username,
            email: values.email,
            password: values.password
        });

        Meteor.users.update(id, {
            $set: {
                groupId: values.group
            }
        });

        Roles.addUsersToRoles(id, Role.ADMIN);
    },
    editUser: function(values) {
        checkSuper();
        editUserValidation(values);

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

function editUserValidation (values) {
    if(!values.username)
        throw new Meteor.Error(400, 'Ce nom est invalide');
    if(!values.email)
        throw new Meteor.Error(400, 'Cet email est invalide');
    if(!values.group)
        throw new Meteor.Error(400, 'Ce groupe est invalide');
    if(!Groups.findOne(values.group))
        throw new Meteor.Error(404, 'Le groupe n\'existe pas');
}

function addUserValidation (values) {
    editUserValidation(values);
    if(!values.password)
        throw new Meteor.Error(400, 'Ce mot de passe est invalide');
}
