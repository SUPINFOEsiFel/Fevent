Template.eventForm.rendered=function() {
    $('body').find('.datetimepicker').datetimepicker({locale: 'fr'});
};

Template.eventForm.helpers({
    finish: function() {
        return {
            finished: function(index, fileInfo, context) {
                $('#picture').val(fileInfo.name);
            }
        };
    }
});
