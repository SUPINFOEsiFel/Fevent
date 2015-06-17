Template.housePreview.events({
    'click .house-display': function() {
        var modal = ReactiveModal.initDialog({
            template: Template.houseDisplay,
            modalDialogClass: 'modal-lg',
            title: this.name,
            doc: this,
            buttons: {
                cancel: {
                    class: 'btn-default',
                    label: 'Fermer'
                }
            }
        });

        modal.show();
        $('.house-more').on('click', function(){
            modal.hide();
        });
    }
});
