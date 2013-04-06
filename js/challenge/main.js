require.config({
    paths: {
        public: '/',
        jquery: '/js/vendor/jquery-1.9.1.min',
        underscore: '/js/vendor/underscore-min',
        backbone: '/js/vendor/backbone-min',
        text: '/js/vendor/text',
        templates: '/js/templates',
        vendor: '/js/vendor',
        i18n: '/js/vendor/i18n',
        url: '/js/vendor/url',
        challenge: '/js/challenge'
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore","jquery"],
            exports: "Backbone"
        },
        "i18n": {
            deps: ["jquery"]
        }
    }
});

define([
    'app'
], function(App){
    Main = {
        initialize: function(options) {
            App.initialize(options);
        }
    };
    return Main;
});
