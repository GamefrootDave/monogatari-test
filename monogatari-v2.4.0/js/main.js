"use strict";
/* global Monogatari */
/* global monogatari */

/**
 * =============================================================================
 * This is the file where you should put all your custom JavaScript code,
 * depending on what you want to do, there are 3 different places in this file
 * where you can add code.
 *
 * 1. Outside the $_ready function: At this point, the page may not be fully
 *    loaded yet, however you can interact with Monogatari to register new
 *    actions, components, labels, characters, etc.
 *
 * 2. Inside the $_ready function: At this point, the page has been loaded, and
 *    you can now interact with the HTML elements on it.
 *
 * 3. Inside the init function: At this point, Monogatari has been initialized,
 *    the event listeners for its inner workings have been registered, assets
 *    have been preloaded (if enabled) and your game is ready to be played.
 *
 * You should always keep the $_ready function as the last thing on this file.
 * =============================================================================
 **/

const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:

//Some extra setup so the parent page and iframe can talk to each other once Monogatari is ready - not necessary here, but kept for demonstration;
//Preload images sent from parent document;
async function preloadImages(imageUrls) {
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(url);
      img.src = url;
    });
  };

  try {
    await Promise.all(imageUrls.map(loadImage));
    console.log("Preloaded images completed:", imageUrls);
    window.parent.postMessage({ type: "PRELOAD_COMPLETE" }, "*");
  } catch (error) {
    console.error("Failed to preload some images:", error);
    // Still notify parent but with error
    window.parent.postMessage(
      {
        type: "PRELOAD_COMPLETE",
        error: "Some images failed to load",
      },
      "*"
    );
  }
}

// Add message listener for image preloading
window.addEventListener("message", (event) => {
  if (event.data.type === "PRELOAD_IMAGES") {
    preloadImages(event.data.imageUrls);
  }
});


$_ready(() => {
  // 2. Inside the $_ready function:

  monogatari.init("#monogatari").then(() => {
    // 3. Inside the init function:

    //make monogatari available to the window object so parent of iframe can access it;
    window.monogatari = monogatari;
    window.$_ = $_;
    window.parent.postMessage({ type: "MONOGATARI_READY" }, "*");
  });
});
