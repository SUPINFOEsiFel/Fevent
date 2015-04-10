Template.eventForm.created = function() {
    Session.set(UPLOAD_SESSION_KEY, '');
};

Template.eventForm.helpers({
    callbacks: function() {
        return {
            finished: function(index, fileInfo, context) {
                Session.set(UPLOAD_SESSION_KEY, fileInfo.name);
            }
        };
    },
    pictureName: function () {
        return Session.get(UPLOAD_SESSION_KEY);
    },
    edit: function () {
        return this.mode === MODE_EDIT;
    }
});

Template.eventForm.rendered = function() {
    $('body').find('.datetimepicker').datetimepicker({locale: 'fr'});
};
