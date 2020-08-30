function setNavIndicator(current) {
    $nav.find('a').removeClass('active');

    current.addClass('active');

    const marginLeft = parseInt( current.parent().css('margin-left'), 10);
    const parent = current.parent();

    const left = parent.position().left + marginLeft + 'px';
    const width = parent.css('width');

    $('#nav-indicator').css({
        left,
        width
    });
}

$window.on('scroll', () => {
    const scrolled = $window.scrollTop();

    //when reaches the row, also add a class to the navigation
    for (let key in sectionIds) {
        if ( sectionIds.hasOwnProperty(key) ) {

            if (scrolled >= sectionIds[key]) {
                let id = '#' + key;
                let current = $nav.find('a[href=' + id + ']');

                setNavIndicator(current);
            }
        }
    }
});
