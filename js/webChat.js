var socket = io();

var scrollIntoView = function () {
    console.log($(window).scrollTop() + " + " + $(window).height() + " = " + $(document).height());
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 30) {
        $("html,body").animate({ scrollTop: $('#messages li:last').offset().top }, 0);
    }
};

$(document).ready(function () {
    $('form').submit(function () {
        if ($('#m').val() !== "") {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            $('#m').focus();
        }
        return false;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
        scrollIntoView();
    });
    socket.on('system message', function (msg) {
        $('#messages').append($('<li class="systemMsg">').text(msg));
        scrollIntoView();
    });
});