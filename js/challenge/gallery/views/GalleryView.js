define([
    'jquery',
    'underscore',
    'backbone',
    'challenge/gallery/views/GalleryTabMenuView',
    'text!templates/gallery/gallery-layout.jst',
    'text!templates/gallery/gallery-item.jst'
], function($, _, Backbone, GalleryTabMenuView, galleryLayoutTemplate, galleryItemTemplate){

    GalleryView = Backbone.View.extend({

        events: {
            'click .load-more' : 'searchNextPage'
        },

        render: function() {
            var compiledTemplate = _.template( galleryLayoutTemplate, {});
            this.$el.append($(compiledTemplate).i18n());
            this.$el.find('header').html(this.tabMenuView.el);
        },

        clearList: function() {
            var list = this.$el.find('ul#gallery');
            list.children().remove();
        },

        renderGalleryItems: function() {
            var list = this.$el.find('ul#gallery');
            _.forEach(this.collection.models, function(item){
                var compiledTemplate = _.template( galleryItemTemplate, {item: item});
                list.append($(compiledTemplate).i18n());
            });
        },

        searchNextPage: function() {
            this.collection.search({
                page : this.collection.page + 1
            });
            return false;
        },

        initNextPageListener: function() {
            var that = this;
            $(window).scroll(function () {
                if(that.collection.loaded && ($(window).height() - ($(window).scrollTop()+document.body.clientHeight) < 50)){
                    that.searchNextPage();
                }
            });

        },

        initialize: function(options) {
            this.tabMenuView = new GalleryTabMenuView();
            this.collection = options.galleryCollection;
            this.render();
            this.initNextPageListener();
            this.listenTo(this.collection, 'clear', this.clearList);
            this.listenTo(this.collection, 'reset', this.renderGalleryItems);
        }
    });

    return GalleryView;
});
