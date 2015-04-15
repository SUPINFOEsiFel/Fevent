Template.userForm.events({
    'keypress input': function(e) {
        if (e.charCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            $('.save').click();
            return false;
        }
    }
});
