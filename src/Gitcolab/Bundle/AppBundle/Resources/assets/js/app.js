import $ from 'jquery';
import '../styles/app.less';

$(function(){
    $('#diff-file--list').collapse({
        toggle: false
    });

    $('.collapse-file-diff').click( function() {
        console.log('dd');
        $('#diff-file--list').collapse('show');
    });
});
