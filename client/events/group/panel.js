Template.groupPanel.events({
    'click #group-add': function() {
        openPersistModal({
            mode: MODE_ADD,
            title: 'Ajouter un groupe',
            template: Template.groupForm,
            method: 'addGroup',
            fields: ['name'],
            error: 'Impossible d\'ajouter le groupe'
        });
    },
    'click .group-edit': function() {
        openPersistModal({
            mode: MODE_EDIT,
            title: 'Éditer le groupe',
            template: Template.groupForm,
            method: 'editGroup',
            error: 'Impossible d\'éditer le groupe',
            fields: ['name'],
            values: this
        });
    },
    'click .group-remove': function() {
        var groupId = this._id;

        swal({
            title: 'Êtes-vous sûr ?',
            text: 'Le groupe va être supprimé !',
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
                Meteor.call('removeGroup', groupId);
                swal('Évènement supprimé !', 'Le groupe a été supprimé', 'success');
            }
        });
    }
});
