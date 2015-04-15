openPersistModal = function(parameters) {
    var values = parameters.values ? parameters.values : {};
    values['mode'] = parameters.mode;
    var id = values._id;

    var modal = ReactiveModal.initDialog({
        template: parameters.template,
        modalDialogClass: 'modal-lg',
        title: parameters.title,
        buttons: {
            cancel: {
                class: 'btn-danger',
                label: 'Annuler'
            },
            save: {
                closeModalOnClick: false,
                class: 'btn-success',
                label: 'Enregistrer'
            }
        },
        doc: values
    });

    modal.buttons.save.on('click', function() {
        var parent = $(modal.modalTarget);
        var values = parameters.mode === MODE_ADD ? {} : {
            id: id
        };

        parameters.fields.forEach(function(field) {
            values[field] = parent.find('#' + field).val();
        });

        Meteor.call(parameters.method, values, function(error) {
            if (error) {
                swal(parameters.error, error, 'error');
            } else {
                modal.hide();
            }
        });
    });

    modal.show();
};
