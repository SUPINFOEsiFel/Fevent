Template.userPanel.events({
    'click #user-add': function() {
        openPersistModal({
            mode: MODE_ADD,
            title: 'Ajouter un utilisateur',
            template: Template.userForm,
            method: 'addUser',
            fields: ['username', 'email', 'password'],
            error: 'Impossible d\'ajouter un utilisateur !'
        });
    },
    'click .user-edit': function() {
        openPersistModal({
            mode: MODE_EDIT,
            title: 'Éditer l\'utilisateur',
            template: Template.userForm,
            method: 'editUser',
            error: 'Impossible d\'éditer l\'utilisateur !',
            fields: ['username', 'email'],
            values: this
        });
    },
    'click .user-remove': function() {
        var userId = this._id;

        swal({
            title: 'Êtes-vous sûr ?',
            text: 'L\'utilisateur va être définitivement supprimé !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: COLOR_DANGER,
            confirmButtonText: 'Oui, le supprimer',
            cancelButtonText: 'Non, annuler',
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function(confirmed) {
            if (confirmed) {
                Meteor.call('removeUser', userId);
                swal('Utilisateur supprimé !', 'L\'utilisateur a été supprimé.', 'success');
            }
        });
    }
});
