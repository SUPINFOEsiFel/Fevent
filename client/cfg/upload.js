Meteor.startup(function() {
    Uploader.uploadUrl = Meteor.absoluteUrl("upload");
});
