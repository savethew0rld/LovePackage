document.addEventListener('DOMContentLoaded', function () {
    const videoUrlElements = document.querySelectorAll('.video-url');

    videoUrlElements.forEach((videoUrlElement) => {
        const container = videoUrlElement.closest('.w-iframe');

        if (!container) {
            return; // Skip if the container is not found
        }

        const videoUrlMatch = videoUrlElement.textContent.match(/Video URL: (.*)/);

        if (!videoUrlMatch || videoUrlMatch.length < 2) {
            return; // Skip if the video URL format is not correct
        }

        const videoUrl = videoUrlMatch[1];
        const videoId = videoUrl.split('v=')[1]; // Extract video ID from URL

        const iframe = document.createElement('iframe');
        iframe.height = '100%';
        iframe.width = '100%';
        iframe.id = `iframe-${videoId}`;
        iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
        iframe.frameborder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        iframe.style.borderColor = '#37474F'; // Initial border color

        container.parentNode.replaceChild(iframe, container);

        // Load YouTube API script
        const tag = document.createElement('script');
        tag.id = 'iframe-demo';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player(`iframe-${videoId}`, {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    });
});
</script >

    <script>
  // Function to pause a specific video
        function pauseVideo(iframe) {
    if (iframe) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }

  // Create an Intersection Observer
  const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || document.hidden) {
                    // Video is not in view or tab is hidden, pause it
                    const iframe = entry.target.querySelector("iframe");
                    pauseVideo(iframe);
                }
            });
  });

        // Observe all video containers with class "cms-video"
        const videoContainers = document.querySelectorAll(".cms-video");
  videoContainers.forEach(container => {
            observer.observe(container);
  });

  // Listen for visibility change events
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
            // Tab is hidden, pause all videos
            videoContainers.forEach(container => {
                const iframe = container.querySelector("iframe");
                pauseVideo(iframe);
            });
    }
  });