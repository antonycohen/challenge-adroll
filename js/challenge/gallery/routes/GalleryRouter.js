define([
    'jquery',
    'underscore',
    'backbone',
    'challenge/gallery/collections/GalleryItemCollection',
    'challenge/gallery/views/GalleryView'
], function($, _, Backbone, GalleryItemCollection, GalleryView){
    GalleryRouter = Backbone.Router.extend({
        routes:{
            "(:type)" : "gallery"
        },

        initialize: function(options) {
            this.galleryCollection = new GalleryItemCollection();
            this.galleryView = new GalleryView({
                galleryCollection : this.galleryCollection
            });
            $('body').append(this.galleryView.el);
        },

        gallery: function(type){
            this.galleryView.tabMenuView.active(type);
            this.galleryCollection.clear();
            this.galleryCollection.search({
                type: type
            });
        }
    });

    return GalleryRouter;
});
