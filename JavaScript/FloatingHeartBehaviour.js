document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('#footer');
    const actionHeart = document.querySelector('#action-heart');
    const showMoreButton = document.querySelector('#show-more-button');

    let stoppingOffset = 100; // Default stopping offset
    let positioningOffset = 60; // Default positioning offset

    function adjustOffsets() {
        if (window.innerWidth <= 480) { // Mobile Portrait
            stoppingOffset = 100;
            positioningOffset = 55;
        } else { // Desktop
            stoppingOffset = 100;
            positioningOffset = 50;
        }
    }

    function updateActionHeartPosition() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const footerOffsetTop = footer.offsetTop; // Recalculate footer offset

        if (scrollY + windowHeight > footerOffsetTop + stoppingOffset) {
            actionHeart.style.position = 'absolute';
            actionHeart.style.top = `${footerOffsetTop - actionHeart.offsetHeight + positioningOffset}px`;
        } else {
            actionHeart.style.position = 'fixed';
            actionHeart.style.top = '';
        }
    }

    adjustOffsets();
    updateActionHeartPosition();

    window.addEventListener('resize', () => {
        adjustOffsets();
        updateActionHeartPosition();
    });

    window.addEventListener('scroll', updateActionHeartPosition);

    showMoreButton.addEventListener('click', () => {
        // Update the heart's position when the "Show More" button is clicked
        updateActionHeartPosition();
    });
});