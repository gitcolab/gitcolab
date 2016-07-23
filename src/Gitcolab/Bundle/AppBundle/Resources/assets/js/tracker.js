$(function() {


    var Tracker = {
        init: function() {
            jQuery('a[aria-controls="preview-tab"]').click(function() {
                $.post('/preview', {
                    text: $('#team_description').val()
                }, function(data){
                    $('.preview-box').html(data);
                });
            });
        }
    }

    Tracker.init(window.document);
});