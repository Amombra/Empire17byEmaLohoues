/*Add Like buttton*/
(function ($) {
    'use strict';

    $('ul.beautypress-react li a' ).on( 'click', function(e) {
        e.preventDefault();
        var post_id = $(this).data('id');
        var meta_data = $(this).data('emoji');
        var self = $(this);
        $.ajax({
            url : xs_ajax_obj.ajaxurl,
            type : 'post',
            data : {
                action : 'beautypress_post_react',
                post_id : post_id,
                meta_data : meta_data,
                beautypress_security : xs_ajax_obj.ajax_nonce
            },
            success : function( response ) {
                console.log(response);
                if(response != ''){
                    self.next().html(response);
                }
            }
        });
    });

    /**
     *
     * Comment Like
     *
     */
    
    $('ul.beautypress-socail-react li a' ).on( 'click', function(e) {
        e.preventDefault();
        var comment_id = $(this).data('comid');
        var meta_data = $(this).data('like');
        var self = $(this);
        $.ajax({
            url : xs_ajax_obj.ajaxurl,
            type : 'post',
            data : {
                action : 'beautypress_comment_like',
                comment_id : comment_id,
                meta_data : meta_data,
                beautypress_security : xs_ajax_obj.ajax_nonce
            },
            success : function( response ) {
                if(response != ''){
                    self.next().html(response);
                }
            }
        });
    });
})(jQuery)