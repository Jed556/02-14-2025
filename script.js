$(document).ready(function () {
    const envelope = $('#envelope');
    const btnOpen = $("#open");
    const btnReset = $("#reset");

    envelope.on('click', function () {
        if (envelope.hasClass("open")) {
            envelope.removeClass("open").addClass("close");
        } else {
            envelope.removeClass("close").addClass("open");
        }
    });
    btnOpen.on('click', open);
    btnReset.on('click', close);

    function open() {
        envelope.removeClass("close").addClass("open");
    }

    function close() {
        envelope.removeClass("open").addClass("close");
    }

    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        envelope.css('transform', `rotateY(${x}deg) rotateX(-${y}deg)`);
    });
});
