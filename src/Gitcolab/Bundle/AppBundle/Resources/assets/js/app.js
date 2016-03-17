import $ from 'jquery';
//import 'team';


console.log('ddd');

$(function(){
    $('#diff-file--list').collapse({
        toggle: false
    });

    $('.collapse-file-diff').click( function() {
        $('#diff-file--list').collapse('show');
    });
    console.log('ddd');

    $('.selectize').selectize();

});


