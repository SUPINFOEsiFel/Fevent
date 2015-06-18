Template.housePanel.events({
    'click #house-add': function() {
        openPersistModal({
            mode: MODE_ADD,
            title: 'Ajouter un logement',
            template: Template.houseForm,
            method: 'addHouse',
            fields: ['name', 'address', 'zip-code', 'city', 'link', 'picture', 'comment'],
            error: 'Impossible d\'ajouter le logement'
        });
    },
    'click .house-edit': function() {
        openPersistModal({
            mode: MODE_EDIT,
            title: 'Éditer le logement',
            template: Template.houseForm,
            method: 'editHouse',
            error: 'Impossible d\'éditer le logement',
            fields: ['name', 'address', 'zip-code', 'city', 'link', 'picture', 'comment'],
            values: this
        });
    },
    'click .house-remove': function() {
        var houseId = this._id;

        swal({
            title: 'Êtes-vous sûr ?',
            text: 'Le logement va être supprimé !',
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
                Meteor.call('removeHouse', houseId);
                swal('Évènement supprimé !', 'Le logement a été supprimé', 'success');
            }
        });
    }
});
