// glitch.js

document.addEventListener('DOMContentLoaded', () => {
    const initiateTraceButton = document.getElementById('initiateTrace');
    const traceStatus = document.getElementById('traceStatus');
    const accessTerminalButton = document.getElementById('accessTerminal');
    const redGlitchOverlay = document.getElementById('redGlitchOverlay');
    const accessDeniedPopup = document.getElementById('accessDeniedPopup');

    // --- Initiate Trace Button Functionality ---
    if (initiateTraceButton && traceStatus) {
        initiateTraceButton.addEventListener('click', () => {
            initiateTraceButton.classList.add('active');
            traceStatus.textContent = '[SYSTEM]: INITIATING TRACE PROTOCOL...';

            let dots = 0;
            const interval = setInterval(() => {
                dots = (dots + 1) % 4;
                traceStatus.textContent = '[SYSTEM]: TRACING SUBJECT SIGNATURE' + '.'.repeat(dots);
            }, 500);

            setTimeout(() => {
                clearInterval(interval);
                traceStatus.textContent = '[SYSTEM]: TRACE FAILED. SUBJECT SIGNATURE DISRUPTED. ATTEMPTING RECALIBRATION...';
                initiateTraceButton.classList.remove('active');

                setTimeout(() => {
                    traceStatus.textContent = '[SYSTEM]: UNABLE TO ESTABLISH LOCK. MANUAL OVERRIDE REQUIRED.';
                }, 3000); // Message after trace failure
            }, 5000); // Simulate trace time
        });
    }

    // --- Access Terminal Button Functionality ---
    if (accessTerminalButton && redGlitchOverlay && accessDeniedPopup) {
        let terminalAccessed = false; // Flag to ensure one-time effect

        accessTerminalButton.addEventListener('click', () => {
            if (terminalAccessed) {
                return; // Do nothing if already accessed
            }
            terminalAccessed = true;

            // 1. Activate red glitch effect
            redGlitchOverlay.classList.add('active');

            // 2. Show access denied popup after glitch
            setTimeout(() => {
                redGlitchOverlay.classList.remove('active'); // Remove glitch effect
                accessDeniedPopup.classList.add('active'); // Show popup

                // Hide popup after a delay
                setTimeout(() => {
                    accessDeniedPopup.classList.remove('active');
                }, 4000); // Popup visible for 4 seconds
            }, 500); // Glitch runs for 0.5 seconds
        });
    }

    // Optional: Add more dynamic glitch effects to elements
    const glitchElements = document.querySelectorAll('.glitch, .glitch-link, .dossier-title, .logo-text');
    glitchElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            el.style.animationPlayState = 'paused';
            // Simple immediate "glitch"
            el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            el.style.textShadow = `${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 rgba(122,255,108,0.75),
                                   ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 rgba(255,190,61,0.75)`;
        });
        el.addEventListener('mouseout', () => {
            el.style.animationPlayState = 'running';
            el.style.transform = '';
            el.style.textShadow = '';
        });
    });
});