
window.onscroll = function() {slideDownNavBar()};

/**
 * Slides out the navigation bar if the user scrolls > 20 pixels from the top of the page.
 * Otherwise, the navigation bar slides back in (hidden away).
 */
function slideDownNavBar() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("nav-bar").style.top = "0"; // Slide out the nav-bar.
    } else {
      document.getElementById("nav-bar").style.top = "-55px"; // Slide up the nav bar.
    }
  }

document.addEventListener('DOMContentLoaded', () => {

    // Select all 'iframe-container' elements.
    const iframeContainerElements = document.querySelectorAll('.iframe-container');

    // Initialize IntersectionObserver to watch for when iframe containers are in view.
    const intersectionObserver = new IntersectionObserver((visibleContainerEntries) => {
        visibleContainerEntries.forEach(visibleContainerEntry => {

            // Check if the current iframe container is intersecting with the viewport.
            if (visibleContainerEntry.isIntersecting) {

                // Retrieve the currently in view iframe container element.
                const iframeContainer = visibleContainerEntry.target;

                // Create new iframe element to replace the old one.
                const newIframeElement = document.createElement('iframe');
                newIframeElement.src = iframeContainer.dataset.src;

                // Allow full screen mode on the new iframe.
                newIframeElement.allowFullscreen = true;
                newIframeElement.mozallowfullscreen = true;
                newIframeElement.webkitallowfullscreen = true;

                // Clear the original iframe and append the new iframe to the container.
                iframeContainer.innerHTML = '';
                iframeContainer.appendChild(newIframeElement);

                // Stop observing this container as the new iframe has been loaded.
                intersectionObserver.unobserve(iframeContainer)
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.1
    });
    // Observe each iframe container in the list.
    iframeContainerElements.forEach(iframeContainer => {
        intersectionObserver.observe(iframeContainer);
    })
});