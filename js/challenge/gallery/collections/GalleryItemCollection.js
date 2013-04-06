define([
    'underscore',
    'backbone',
    'challenge/gallery/models/GalleryItemModel'
], function(_, Backbone, GalleryItemModel){
    var galleryItemCollection = Backbone.Collection.extend({
        page:1,
        per_page:9,
        type: 'popular',
        loaded : true,

        model:GalleryItemModel,

        url: function() {
            return "/api/shots/"+this.type;
        },

        clear: function() {
            this.reset();
            this.page = 0;
            this.per_page = 9;
            this.type = 'popular';
            this.cache = [];
            this.trigger('clear');
        },

        search: function(options, success){
            if (_.isNumber(options.page)) this.page = parseInt(options.page);
            if (_.isNumber(options.per_page)) this.per_page = parseInt(options.per_page);
            if (_.isString(options.type)) this.type = options.type;

            //Common parameter
            var data = {
                page: this.page,
                per_page : this.per_page
            };

            this.loaded = false;
            this.fetch({
                data: data,
                cache: true,
                success: function(collection, response, options){
                    collection.loaded = true;
                    if(typeof success == "function")
                        success(collection, response, options);
                }
            });
        },

        parse: function(resp){
            this.page = resp.page;
            this.total = resp.total;
            this.pages = resp.pages;
            return resp.shots;
        }
    });
    return galleryItemCollection;
});
