$('.autocomplete-field').selectize({
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    maxItems: 1,
    create: false,
    render: {
        option: function(item, escape) {
            return '<div>' +
                '<img width="20" height="20" class="avatar" src="' + escape(item.avatar) + '" />' +
                '<span class="username">' + escape(item.name) + '</span>' +
                '</div>';
        }
    },
    load: function(query, callback) {
        if (!query.length) return callback();
        $.ajax({
            url: '/api/1/user/autocomplete?q=' + encodeURIComponent(query),
            type: 'GET',
            error: function() {
                callback();
            },
            success: function(res) {
                callback(res.data.slice(0, 10));
            }
        });
    },
    onChange: function(value) {
        $('.add-to-team').submit();
    }
});
