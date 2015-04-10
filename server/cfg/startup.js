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
    Restivus.configure({
        useAuth: true
    });

    Restivus.addCollection(Events, {
        routeOptions: {
            authRequired: true
        }
    });

    // Uploads
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/img',
        acceptFileTypes: /\.(gif|jpe?g|png)$/i, // only images will be accept for now
        checkCreateDirectories: true,
        cacheTime: 100,
        mimeTypes: {
            "xml": "application/xml",
            "vcf": "text/x-vcard"
        }
    });
});
