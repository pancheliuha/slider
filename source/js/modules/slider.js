module.exports = function () {

    /********set main slider variables********/
    var slider = $(".slider"),
        navLeft = slider.find(".prev-slide"),
        navRight = slider.find(".next-slide"),
        positionOfSecond = ($('.slide-wrap').outerWidth()/2 - 167/2)/16 + "rem",
        duration = 500;

        navRight.on('click', navigate);
        navLeft.on('click', navigate);

        //move slides function
        function navigate(e) {
            navRight.attr('disabled','disabled');
            navLeft.attr('disabled','disabled');
            $('.slider__item').removeClass('hovered');

            //nav items variables
            var firstVisible = slider.find(".visible_first"),
                secondVisible = slider.find(".visible_second"),
                thirdVisible = slider.find(".visible_third");

            var previousRequire = $(firstVisible).prev(),
                nextRequire = $(thirdVisible).next();
            checkRequires();

            //move next animations
            if (e.currentTarget.dataset.navigation == 'right') {

                //scale and move last slide
                $(thirdVisible).css('animation','scaleIn ' + duration +'ms').animate({
                    right: "-200px",
                    opacity: 0
                }, duration, 'linear');

                //animate first slide
                setTimeout(function () {

                    previousRequire.css({
                        animation:'scaleOut ' + duration +'ms',
                        display: 'inline-block',
                        opacity: 0,
                        position: 'absolute',
                        left: '-300px'
                    }).animate({
                        left: "0px",
                        opacity: 1
                    }, duration, 'linear', function () {
                        //set next requires item
                        firstVisible.removeClass('visible_first').addClass('visible_second');
                        secondVisible.removeClass('visible_second').addClass('visible_third');
                        thirdVisible.removeClass('visible_third');

                        previousRequire.addClass('visible_first');

                        navRight.attr('disabled',false);
                        navLeft.attr('disabled',false);
                        $('.slider__item').addClass('hovered');
                    });

                    setTimeout(function () {

                        firstVisible.animate({
                            left: positionOfSecond
                        }, duration/2, 'linear');

                        secondVisible.css({
                            right : positionOfSecond,
                            left: 'auto'
                        }).animate({
                            right: '0'
                        }, duration/2, 'linear');
                    }, duration/2);

                }, duration*0.8);
            }

            //previous move animations
            if (e.currentTarget.dataset.navigation == 'left') {
                $(firstVisible).css('animation','scaleIn ' + duration +'ms').animate({
                    left: "-200px",
                    opacity: 0
                }, duration, 'linear');

                //animate first slide
                setTimeout(function () {

                    nextRequire.css({
                        animation: 'scaleOut ' + duration +'ms',
                        display: 'inline-block',
                        opacity: 0,
                        position: 'absolute',
                        left: 'auto',
                        right: '-300px'
                    }).animate({
                        right: "0px",
                        opacity: 1
                    }, duration, 'linear', function () {
                        //set next requires item
                        thirdVisible.removeClass('visible_third').addClass('visible_second');
                        secondVisible.removeClass('visible_second').addClass('visible_first');
                        firstVisible.removeClass('visible_first');

                        nextRequire.addClass('visible_third');

                        navRight.attr('disabled',false);
                        navLeft.attr('disabled',false);
                        $('.slider__item').addClass('hovered');
                    });

                    setTimeout(function () {

                        thirdVisible.animate({
                            right: positionOfSecond
                        }, duration/2, 'linear');

                        secondVisible.css({
                            left : positionOfSecond,
                            right: 'auto'
                        }).animate({
                            left: '0'
                        }, duration/2, 'linear');
                    }, duration/2);

                }, duration*0.8);
            }


            //set new require items
            function checkRequires() {
                var allSlides = slider.find('.slider__item');

                if (!(nextRequire).length) {
                    nextRequire = allSlides.eq(0);
                }

                if (!(previousRequire).length) {
                    previousRequire = allSlides.eq(allSlides.length - 1);
                }
            }

        }
}