define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/gallery/gallery-menu-item.jst'
], function($, _, Backbone, ItemMenuTemplate){

    GalleryView = Backbone.View.extend({

        tagName: 'ul',

        render: function() {
            var that = this;
            this.$el.children().remove();
            _.forEach(this.collection.models, function(menuItem){
                var compiledTemplate = _.template( ItemMenuTemplate, {menuItem: menuItem});
                that.$el.append($(compiledTemplate).i18n());
            });
        },

        initMenuCollection: function() {
            var collection = new Backbone.Collection();
            collection.add([{
                id : 'popular',
                name : 'common.menu.popular',
                url : '/popular',
                active : 0
            },{
                id: 'debuts',
                name: 'common.menu.debuts',
                url: '/debuts',
                active : 0
            }, {
                id: 'everyone',
                name: 'common.menu.everyone',
                url: '/everyone',
                active : 0
            }]);
            this.collection =  collection;
        },

        active: function(menu_id){
            _.forEach(this.collection.models, function(menu){
                menu.set('active',0);
            });
            var menuItem = _.find(this.collection.models, function(menu){ return menu.get('id') == menu_id; });
            if(typeof(menuItem) != "undefined"){
                menuItem.set('active',1);
                this.collection.trigger('reset');
            }
        },

        initialize: function() {
            this.initMenuCollection();
            this.render();
            this.listenTo(this.collection, 'reset', this.render);
        }
    });

    return GalleryView;
});
