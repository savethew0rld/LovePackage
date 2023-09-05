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