$(document).ready(function () {
    const envelope = $('#envelope');
    const introText = $('#intro-text');
    const introMessage = $('#intro-message');
    const sticker = $('#sticker');
    const yesButton = $('#yes-button');
    const noButton = $('#no-button');
    const buttons = $('.buttons');
    const finalWrapper = $('.final-wrapper');
    const finalMessage = $('.final-message');
    const finalSticker = $('.final-sticker');

    const messages = ["Hi Babyyyy!", "Happy Valentines!", "..."];
    let messageIndex = 0;

    const basePattern = 'assets/Pattern2.png';
    const finalPattern = 'assets/Pattern1.png';

    function showNextMessage() {
        if (messageIndex < messages.length) {
            introMessage.text(messages[messageIndex]);
            introText.css('animation', 'none');
            introText[0].offsetHeight; // Trigger reflow
            introText.css('animation', '');
            if (messageIndex === 1) {
                const stickers = ['assets/cinnamons/sticker6.png', 'assets/cinnamons/sticker7.png'];
                const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
                sticker.attr('src', randomSticker);
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
            $('body').children().css('opacity', '0').css('pointer-events', 'none');
            adjustFinalElements();
            showFinalMessage();
            changeBackgroundPattern(finalPattern); // Change background pattern
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
            noButton.on(el, function (event) {
                if (envelope.hasClass("open")) {
                    const top = getRandomNumber($('body').height() - noButton.outerHeight());
                    const left = getRandomNumber($('body').width() - noButton.outerWidth());

                    animateMove(noButton[0], "left", left).play();
                    animateMove(noButton[0], "top", top).play();

                    const stickers = ['assets/cinnamons/sticker9.png', 'assets/cinnamons/sticker10.png', 'assets/cinnamons/sticker11.png', 'assets/cinnamons/sticker12.png'];
                    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
                    const noButtonSticker = $('<img>', {
                        src: randomSticker,
                        class: 'no-button-sticker',
                        css: {
                            top: `${event.pageY + 20}px`,
                            left: `${event.pageX}px`,
                            position: "fixed",
                            transform: "translate(-50%, -50%)",
                            width: "120px",
                            height: "auto",
                            display: "block", // Ensure the sticker is displayed
                            animation: "fadeInEnlargeShakeShrinkFadeOut 2s ease-in-out forwards",
                        }
                    });
                    $('body').append(noButtonSticker);
                    setTimeout(() => noButtonSticker.remove(), 3000); // Remove after animation
                }
            });
        });

        const getRandomNumber = (num) => {
            return Math.floor(Math.random() * (num + 1));
        };
    }

    function changeBackgroundPattern(pattern) {
        $('body').css('background-image', `url(${pattern})`);
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

    function centerButtons() {
        const windowWidth = $(window).width();
        const buttonWidth = yesButton.outerWidth();
        const spaceBetween = 50;

        const totalWidth = 2 * buttonWidth + spaceBetween;
        const startLeft = (windowWidth - totalWidth) / 2;

        yesButton.css('left', `${startLeft}px`);
        noButton.css('left', `${startLeft + buttonWidth + spaceBetween}px`);
    }


    function showFinalMessage() {
        const stickers = ['assets/cinnamons/sticker1.png', 'assets/cinnamons/sticker3.png', 'assets/cinnamons/sticker8.png'];
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        finalSticker.attr('src', randomSticker);
        finalWrapper.removeClass('hidden').addClass('shown');
        $('body').addClass('final-message-shown'); // Add class to body
    }

    function adjustFinalElements() {
        const windowWidth = $(window).width();
        const minFontSize = 1; // Minimum font size in em
        const maxFontSize = 2.5; // Maximum font size in em
        const minStrokeWidth = 5; // Minimum stroke width in px
        const maxStrokeWidth = 8; // Maximum stroke width in px
        const minImageSize = 150; // Minimum image size in px
        const maxImageSize = 300; // Maximum image size in px
        const minWidth = 576; // Minimum window width
        const maxWidth = 1200; // Maximum window width

        const fontSize = minFontSize + (maxFontSize - minFontSize) * (windowWidth - minWidth) / (maxWidth - minWidth);
        const strokeWidth = minStrokeWidth + (maxStrokeWidth - minStrokeWidth) * (windowWidth - minWidth) / (maxWidth - minWidth);
        const imageSize = minImageSize + (maxImageSize - minImageSize) * (windowWidth - minWidth) / (maxWidth - minWidth);

        finalMessage.css('font-size', Math.max(minFontSize, Math.min(maxFontSize, fontSize)) + 'em');
        finalMessage.css('-webkit-text-stroke-width', Math.max(minStrokeWidth, Math.min(maxStrokeWidth, strokeWidth)) + 'px');
        finalSticker.css('width', Math.max(minImageSize, Math.min(maxImageSize, imageSize)) + 'px');
    }

    $(window).on('resize', function () {
        adjustFontSize();
        adjustFinalElements();
        centerButtons();
    });

    adjustFontSize(); // Initial call to set the font size
    centerButtons(); // Initial call to center the buttons
    showNextMessage(); // Start the message loop
    changeBackgroundPattern(basePattern); // Set initial background pattern

    $(document).on('mousemove', function (e) {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        envelope.css('transform', `rotateY(${x}deg) rotateX(${y}deg)`);
    });
});
