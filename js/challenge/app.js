define([
    'jquery',
    'underscore',
    'require',
    'backbone',
    'challenge/gallery/routes/GalleryRouter',
    'i18n',
    'vendor/backbone.fetch-cache'
], function($, _, require, Backbone, GalleryRouter,url){

    var initialize = function(options) {
        resetCache();
        initI18n();
        initEventHandler();
        initRouter();
        initHistory();

    };

    var resetCache = function(){
        Backbone.fetchCache._cache = {};
        Backbone.fetchCache.setLocalStorage();
    }

    var initI18n = function() {
        $.i18n.init({
            fallbackLng: 'fr',
            ns: { namespaces: ['ns.common'], defaultNs: 'ns.common'},
            useLocalStorage: false,
            resGetPath: '/js/locales/__lng__/__ns__.json?',
            getAsync: false
        });
    };

    var initRouter = function() {
        //Init Router
        new GalleryRouter();
    };

    var initHistory = function() {
        Backbone.history.start({
            pushState: true
        });

    };

    var initEventHandler = function() {
        $(document).on('click','a', function() {
            var href = $(this).attr("href");
            if (href != "#"){
                Backbone.history.navigate(href , {trigger:true});
                return false;
            }
        });
    };

    return {
        initialize: initialize
    };
});



