$(document).ready(function () {
    const envelope = $('#envelope');

    envelope.on('click', function () {
        if (envelope.hasClass("open")) {
            envelope.removeClass("open").addClass("close");
        } else {
            envelope.removeClass("close").addClass("open");
        }
    });

    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        envelope.css('transform', `rotateY(${x}deg) rotateX(${y}deg)`);
    });

    // Trigger the scale down animation on page load
    envelope.addClass('animate');
});
