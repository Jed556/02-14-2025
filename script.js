$(document).ready(function () {
    const envelope = $('#envelope');
    const introText = $('#intro-text');
    const introMessage = $('#intro-message');
    const sticker = $('#sticker');
    const yesButton = $('#yes-button');
    const noButton = $('#no-button');
    const buttons = $('.buttons');
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
                buttons.removeClass('shown').addClass('hidden');
            } else {
                envelope.removeClass("close").addClass("open");
                buttons.removeClass('hidden').addClass('shown');
            }
        });

        yesButton.on('click', function () {
            console.log("Yay! Happy Valentine's Day!");
        });

        noButton.on('click', function () {
            console.log("Oh no! Maybe next time.");
        });

        const animateMove = (element, prop, pixels) =>
            anime({
                targets: element,
                [prop]: `${pixels}px`,
                easing: "easeOutCirc"
            });

        ["mouseover", "click"].forEach(function (el) {
            noButton.on(el, function () {
                if (envelope.hasClass("open")) {
                    const top = getRandomNumber($('body').height() - noButton.outerHeight());
                    const left = getRandomNumber($('body').width() - noButton.outerWidth());

                    animateMove(noButton[0], "left", left).play();
                    animateMove(noButton[0], "top", top).play();
                }
            });
        });

        const getRandomNumber = (num) => {
            return Math.floor(Math.random() * (num + 1));
        };
    }

    function adjustFontSize() {
        const windowWidth = $(window).width();
        const minFontSize = 1; // Minimum font size in em
        const maxFontSize = 5; // Maximum font size in em
        const minStrokeWidth = 5; // Minimum stroke width in px
        const maxStrokeWidth = 13; // Maximum stroke width in px
        const minImageSize = 50; // Minimum image size in px
        const maxImageSize = 100; // Maximum image size in px
        const minWidth = 576; // Minimum window width
        const maxWidth = 1200; // Maximum window width

        const fontSize = minFontSize + (maxFontSize - minFontSize) * (windowWidth - minWidth) / (maxWidth - minWidth);
        const strokeWidth = minStrokeWidth + (maxStrokeWidth - minStrokeWidth) * (windowWidth - minWidth) / (maxWidth - minWidth);
        const imageSize = minImageSize + (maxImageSize - minImageSize) * (windowWidth - minWidth) / (maxWidth - minWidth);

        introText.css('font-size', Math.max(minFontSize, Math.min(maxFontSize, fontSize)) + 'em');
        introText.css('-webkit-text-stroke-width', Math.max(minStrokeWidth, Math.min(maxStrokeWidth, strokeWidth)) + 'px');
        sticker.css('width', Math.max(minImageSize, Math.min(maxImageSize, imageSize)) + 'px');
    }

    function resetNoButtonPosition() {
        noButton.css('bottom', '20vh');
        noButton.css('left', '55%');
    }

    $(window).on('resize', function () {
        adjustFontSize();
        resetNoButtonPosition();
    });

    adjustFontSize(); // Initial call to set the font size
    showNextMessage();

    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        envelope.css('transform', `rotateY(${x}deg) rotateX(${y}deg)`);
    });
});
