Meteor.startup(function() {
    if (Meteor.roles.find().count() === 0) {
        // Default roles
        Roles.createRole(Role.SUPER_ADMIN);
        Roles.createRole(Role.ADMIN);
        Roles.createRole(Role.USER);

        console.log('Roles created');
    }

    if (Meteor.users.find().count() === 0) {
        // Default admin
        var id = Accounts.createUser({
            username: DEFAULT_ADMIN_USERNAME,
            password: DEFAULT_ADMIN_PASSWORD
        });

        Roles.addUsersToRoles(id, Role.SUPER_ADMIN);
        console.log('Default super-admin created');
    }

    // API
    restivusInit();

    // Uploads
    UploadServer.init({
        tmpDir: UPLOAD_FULL_PATH + 'tmp',
        uploadDir: process.env.PWD + UPLOAD_DIR,
        acceptFileTypes: /\.(gif|jpe?g|png)$/i,
        checkCreateDirectories: true,
        mimeTypes: {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "gif": "image/gif"
        }
    });
});
