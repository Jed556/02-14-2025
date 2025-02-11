$(document).ready(function () {
    const envelope = $('#envelope');
    const introText = $('#intro-text');
    const introMessage = $('#intro-message');
    const sticker = $('#sticker');
    const messages = ["Hi Babyyyy!", "Happy Valentines!", "..."];
    let messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            introMessage.text(messages[messageIndex]);
            introText.css('animation', 'none');
            introText[0].offsetHeight; // Trigger reflow
            introText.css('animation', '');
            if (messageIndex === 1) {
                sticker.show();
            } else {
                sticker.hide();
            }
            messageIndex++;
            setTimeout(showNextMessage, 3000);
        } else {
            introText.hide();
            envelope.addClass('animate');
            enableEnvelopeClick();
        }
    }

    function enableEnvelopeClick() {
        envelope.on('click', function () {
            if (envelope.hasClass("open")) {
                envelope.removeClass("open").addClass("close");
            } else {
                envelope.removeClass("close").addClass("open");
            }
        });
    }

    showNextMessage();

    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        envelope.css('transform', `rotateY(${x}deg) rotateX(${y}deg)`);
    });
});
