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
        uploadDir: process.env.PWD + '/.uploads/',
        acceptFileTypes: '/.(gif|jpe?g|png)$/i', // only images will be accept for now
        imageVersions: {
            thumbnailLarge: {width: 1200, height: 900},
            thumbnailMedium: {width: 400, height: 300},
            thumbnailSmall: {width: 200, height: 100}
        },
        checkCreateDirectories: true,
        getDirectory: function(fileInfo, formData) {
            // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
            return formData.contentType;
        },
        cacheTime: 100,
        mimeTypes: {
            "xml": "application/xml",
            "vcf": "text/x-vcard"
        }
    });
});
