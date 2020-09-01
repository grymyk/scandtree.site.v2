// const nav = ;
let isClosed = true;

const hamburgerClickHandler = () => {
    console.log('click hamburger')

    if (isClosed) {
        nav.addClass('open');
        isClosed = false;
    } else {
        nav.removeClass('open');
        isClosed = true;
    }

    return false;
};

(function($) {
    $(document).ready( () => {
        const $window = $(window);
        const $body = $('body');
        const $header = $('#header');
        const $nav = $('.desktop_menu_holder');
        const $hamburger = $('#hamburger');

        let resizeTimeout = null;
        let sectionIds = {};
        const sections = $('section');
        const headerHeight = $header.height();

        function setFirstLimit(shift) {
            const property = sections.eq(0).attr('id');
            const top = parseInt( sections.eq(0).first().offset().top, 10 );

            sectionIds[property] = Math.ceil(top - shift);
        }

        function setScreanSize(item, prev) {
            const prevScreanPart = parseInt( prev.height() / 2, 10);

            const property = item.attr('id');
            const top = parseInt( item.first().offset().top, 10);

            const value = Math.ceil(top) - prevScreanPart;

            return {
                property,
                value
            }
        }

        function setLimits(shift) {
            for (let i = 1, len = sections.length; i < len; i += 1) {
                let obj = setScreanSize( sections.eq(i), sections.eq(i-1) );

                sectionIds[obj.property] = obj.value - shift;
            }
        }

        function setTopOffset(shift) {
            setFirstLimit(shift);
            setLimits(shift);
        }

        // Hamburger Menu
        let isClosed = true;

        $hamburger.on('click', () => {
            if (isClosed) {
                $header.addClass('open');
                isClosed = false;
            } else {
                $header.removeClass('open');
                isClosed = true;
            }

            return false;
        });

        function clickHandler(event) {
            const id = $(event.target).attr('href');

            const offsetTop = Math.ceil( $(id).first().offset().top - headerHeight );

            $('html, body').animate({
                scrollTop: offsetTop + 'px'
            }, 300);

            if (isClosed === false) {
                $header.removeClass('open');
                isClosed = true;
            }

            return false;
        }

        $nav.find('a').on('click', clickHandler);

        setTopOffset(headerHeight);
    });
})(jQuery);
