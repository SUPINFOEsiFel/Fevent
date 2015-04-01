Template.eventPreview.events({
    'click .event-display': function() {
        var modal = ReactiveModal.initDialog({
            template: Template.eventDisplay,
            modalDialogClass: 'modal-lg',
            title: this.name,
            doc: this,
            buttons: {
                cancel: {
                    class: 'btn-default',
                    label: 'Close'
                }
            }
        });

        modal.show();
    }
});
