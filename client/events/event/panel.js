Template.eventPanel.events({
    'click #event-add': function() {
        openPersistModal({
            mode: MODE_ADD,
            title: 'Ajouter un évènement',
            template: Template.eventForm,
            method: 'addEvent',
            fields: ['name', 'begin', 'end', 'price', 'address', 'zip-code', 'city', 'country', 'link', 'picture', 'comment'],
            error: 'Impossible d\'ajouter l\'évènement'
        });
    },
    'click .event-edit': function() {
        openPersistModal({
            mode: MODE_EDIT,
            title: 'Éditer l\'évènement',
            template: Template.eventForm,
            method: 'editEvent',
            error: 'Impossible d\'éditer l\'évènement',
            fields: ['name', 'begin', 'end', 'price', 'address', 'zip-code', 'city', 'country', 'link', 'picture', 'comment'],
            values: this
        });
    },
    'click .event-remove': function() {
        var eventId = this._id;

        swal({
            title: 'Êtes-vous sûr ?',
            text: 'L\'évènement va être supprimé !',
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
                Meteor.call('removeEvent', eventId);
                swal('Évènement supprimé !', 'L\'évènement a été supprimé', 'success');
            }
        });
    }
});
