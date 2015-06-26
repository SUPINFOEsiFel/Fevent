Router.configureBodyParsers = function() {
    Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
        extended: true,
        limit: '20mb'
    }), {where: 'server'});
};
