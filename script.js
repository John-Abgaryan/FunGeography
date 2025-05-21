const facts = [
    "Russia spans 11 time zones. ⏰",
    "The Sahara Desert is expanding. 🏜️🌵",
    "Africa is the only continent in all four hemispheres. 🌍",
    "The Dead Sea is so salty that you can easily float in it. 🌊🧂",
    "Canada has the longest coastline of any country in the world. 🌊",
    "The Amazon River is the largest river by discharge volume of water in the world. 🏞️💧",
    "Vatican City is the smallest country in the world. 🤏",
    "Mount Everest, the world\'s highest peak, is still growing. ⛰️🔼",
    "There are more than 25,000 islands in the Pacific Ocean. 🏝️🌊",
    "The Pacific Ocean is the largest and deepest of Earth\'s five oceanic divisions. 🌊🌏",
    "Australia is wider than the moon. 🇦🇺🌕",
    "Tokyo is the world\'s largest city with over 37 million inhabitants. 🇯🇵🏙️",
    "Despite its name, Greenland is mostly covered in ice, not green. 🇬🇱🧊",
    "The shortest international border is between Botswana and Zambia, it\'s only 150 meters long. ↔️",
    "Istanbul, Turkey is the only city in the world that straddles two continents: Europe and Asia. 🌉"
];

const backgroundImages = [
    'https://wallpapers.com/images/hd/captivating-4k-waterfall-scenery-pgwxojx4kbs1oa41.jpg',
    'https://cdn.shopify.com/s/files/1/2467/2501/files/Travertine.png?v=1730412269',
    'https://images.pexels.com/photos/327394/pexels-photo-327394.jpeg?cs=srgb&dl=pexels-pixabay-327394.jpg&fm=jpg'
];

const factButton = document.getElementById('factButton');
const factDisplay = document.getElementById('factDisplay');
const backgroundLayer = document.getElementById('background-layer');
const customCursor = document.getElementById('custom-cursor');
const shadowCursor = document.getElementById('shadow-cursor');
const mainContainer = document.querySelector('.container');
const factWindowContainer = document.querySelector('.fact-window-container');
const emailButton = document.getElementById('emailButton');
const emailModal = document.getElementById('emailModal');
const closeEmailModal = document.getElementById('closeEmailModal');

factButton.addEventListener('click', (event) => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factDisplay.textContent = facts[randomIndex];
    createPoofEffect(event.clientX, event.clientY);

    if (mainContainer) {
        mainContainer.classList.add('shake');
        setTimeout(() => mainContainer.classList.remove('shake'), 500);
    }
    if (factWindowContainer) {
        factWindowContainer.classList.add('shake');
        setTimeout(() => factWindowContainer.classList.remove('shake'), 500);
    }
});

function createPoofEffect(x, y) {
    const numberOfParticles = 10;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('poof-particle');
        document.body.appendChild(particle);

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
        const duration = Math.random() * 0.5 + 0.5;

        particle.style.setProperty('--translateX', `${translateX}px`);
        particle.style.setProperty('--translateY', `${translateY}px`);
        particle.style.animation = `poof-animation ${duration}s ease-out forwards`;

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

const initEmailModal = () => {
    const eButton = document.getElementById('emailButton');
    const eModal = document.getElementById('emailModal');
    const cEmailModal = document.getElementById('closeEmailModal');

    if (eButton && eModal && cEmailModal) {
        console.log('Email modal elements found. Attaching listeners.');

        eButton.addEventListener('click', () => {
            console.log('Email button clicked.');
            eModal.classList.add('active');
        });

        cEmailModal.addEventListener('click', () => {
            console.log('Close modal button clicked.');
            eModal.classList.remove('active');
        });

        window.addEventListener('click', (event) => {
            if (event.target === eModal) {
                console.log('Clicked outside modal content.');
                eModal.classList.remove('active');
            }
        });
    } else {
        console.error('Email modal elements not found. Check IDs in HTML and script.');
        if (!eButton) console.error('emailButton not found');
        if (!eModal) console.error('emailModal not found');
        if (!cEmailModal) console.error('closeEmailModal not found');
    }
};

function setRandomBackground() {
    const backgroundLayer = document.getElementById('background-layer');
    if (backgroundLayer) {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        backgroundLayer.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
        console.log(`Set background to: ${backgroundImages[randomIndex]}`);
    } else {
        console.error('#background-layer element not found.');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setRandomBackground();
        initEmailModal();
    });
} else {
    setRandomBackground();
    initEmailModal();
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const { innerWidth, innerHeight } = window;

    const xAxisBg = (innerWidth / 2 - x) / 25;
    const yAxisBg = (innerHeight / 2 - y) / 25;
    if (backgroundLayer) {
        backgroundLayer.style.transform = `translateX(${xAxisBg}px) translateY(${yAxisBg}px) scale(1.1)`;
    }

    if (customCursor) {
        customCursor.style.left = x + 'px';
        customCursor.style.top = y + 'px';
    }
    if (shadowCursor) {
        shadowCursor.style.left = x + 'px';
        shadowCursor.style.top = y + 'px';
    }

    const rotateY = (x / innerWidth - 0.5) * 10;
    const rotateX = (0.5 - y / innerHeight) * 10;

    if (mainContainer) {
        mainContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    if (factWindowContainer) {
        factWindowContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

document.addEventListener('mouseenter', () => {
    if (customCursor) {
        customCursor.style.opacity = '1';
    }
    if (shadowCursor) {
        shadowCursor.style.opacity = '1';
    }
});

document.addEventListener('mouseleave', () => {
    if (customCursor) {
        customCursor.style.opacity = '0';
    }
    if (shadowCursor) {
        shadowCursor.style.opacity = '0';
    }
});

function initCustomCursor() {
    const customCursorEl = document.getElementById('custom-cursor');
    const shadowCursorEl = document.getElementById('shadow-cursor');

    if (!customCursorEl || !shadowCursorEl) {
        console.error('Custom cursor or shadow cursor element not found.');
        if (!customCursorEl) console.error('#custom-cursor not found for initCustomCursor');
        if (!shadowCursorEl) console.error('#shadow-cursor not found for initCustomCursor');
        return;
    }

    customCursorEl.style.opacity = '1';
    shadowCursorEl.style.opacity = '1';

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        customCursorEl.style.left = x + 'px';
        customCursorEl.style.top = y + 'px';
        shadowCursorEl.style.left = x + 'px';
        shadowCursorEl.style.top = y + 'px';
    });

    document.addEventListener('mouseenter', () => {
        customCursorEl.style.opacity = '1';
        shadowCursorEl.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        customCursorEl.style.opacity = '0';
        shadowCursorEl.style.opacity = '0';
    });
    console.log("Custom cursor initialized.");
}

function initPerspectiveEffect() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const { innerWidth, innerHeight } = window;

        const rotateY = (x / innerWidth - 0.5) * 10;
        const rotateX = (0.5 - y / innerHeight) * 10;

        if (mainContainer) {
            mainContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (factWindowContainer) {
            factWindowContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
}

function initFactButton() {
    factButton.addEventListener('click', (event) => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factDisplay.innerHTML = facts[randomIndex];
        createPoofEffect(event.clientX, event.clientY);

        if (mainContainer) {
            mainContainer.classList.add('shake');
            setTimeout(() => mainContainer.classList.remove('shake'), 500);
        }
        if (factWindowContainer) {
            factWindowContainer.classList.add('shake');
            setTimeout(() => factWindowContainer.classList.remove('shake'), 500);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    setRandomBackground();
    initFactButton();
    initEmailModal();
    initCustomCursor();
    initPerspectiveEffect();
    console.log("All initializations called.");
});

console.log("Script loaded. Event listeners will be set up on DOMContentLoaded.");
