const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {

    //store the triggered events
    window.deferredPrompt = event;

});


butInstall.addEventListener('click', async () => {

    // check if the prompt is available
    const promptEvent = window.deferredPrompt;

    // return if the prompt is deferred
    if (!promptEvent) {
        return;
    }

    // show the prompt
    promptEvent.prompt();

    //reset the deferred prompt
    window.deferredPrompt = null;

    // hide the button
    butInstall.classList.toggle('hidden', true);

});


window.addEventListener('appinstalled', (event) => {

    //clear the prompt
    window.deferredPrompt = null;
});
