import $ from 'jquery';
import 'bootstrap';
import 'selectize';
import '../scss/app.scss';


window.$ = $;
window.jQuery = $;

$(function(){
    $('#diff-file--list').collapse({
        toggle: false
    });

    $('.collapse-file-diff').click( function() {
        $('#diff-file--list').collapse('show');
    });

    $('.selectize').selectize();

});


