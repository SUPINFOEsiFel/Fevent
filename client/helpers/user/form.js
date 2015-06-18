Template.userForm.helpers({
    email: function() {
        if (this.mode === MODE_EDIT && 'emails' in this) {
            return this.emails[0].address;
        }
    },
    groups : function() {
        return Groups.find();
    },
    add: function() {
        return this.mode === MODE_ADD;
    },
    isSelected: function(userGroupId, groupId) {
        return userGroupId === groupId;
    }
});
