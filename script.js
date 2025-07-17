document.addEventListener('DOMContentLoaded', () => {
    const backgroundAudio = document.getElementById('backgroundAudio');
    const activateSoundBtn = document.getElementById('activateSoundBtn');

    const soundActivationStep = document.getElementById('soundActivationStep');
    const authStep = document.getElementById('authStep');
    const desktop = document.getElementById('desktop'); // Main desktop container

    const passwordInput = document.getElementById('passwordInput');
    const enterAuthBtn = document.getElementById('enterAuthBtn');
    const authErrorMessage = document.getElementById('authErrorMessage');
    const screenGlitchOverlay = document.getElementById('screenGlitchOverlay');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
    const progressStatus = document.getElementById('progressStatus');

    const objectListContainer = document.getElementById('objectList');
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsId = document.getElementById('detailsId');
    const detailsType = document.getElementById('detailsType');
    const detailsStatus = document.getElementById('detailsStatus');
    const detailsLastContact = document.getElementById('detailsLastContact');
    const detailsDescription = document.getElementById('detailsDescription');

    const mainOsWindow = document.getElementById('mainOsWindow');
    const consoleWindow = document.getElementById('consoleContainer');
    const consoleIcon = document.getElementById('console-icon');
    const consoleOutput = document.getElementById('consoleOutput');
    const consoleInput = document.getElementById('consoleInput');
    const bsodScreen = document.getElementById('bsodScreen');
    const errorSound = document.getElementById('errorSound'); // Added error sound element

    const taskbarApps = document.getElementById('taskbar-apps');
    const clockElement = document.getElementById('clock');

    const CORRECT_PASSWORD = '95489548';
    const ERROR_SOUND_PATH = 'assets/audio/error.mp3'; // Defined, but using the element now

    // --- Object Data (from user provided script.js) ---
    const objectData = {
        '001': {
            id: '#001',
            name: 'Предвестник Смерти',
            type: 'Антропоморфная Сущность',
            status: 'НЕИЗВЕСТНО',
            lastContact: '████-03-17 / 14:30 UTC',
            description: 'Аномалия возникла в результате инцидента с участием заместителя ████████ (Кирилл), нарушившего протоколы при работе с аппаратом переноса сознания. Субъект погиб, в результате чего произошла трансформация его психоэнергетической матрицы в автономную, крайне враждебную форму. Предвестник Смерти проявляется исключительно в нижних секторах Hadal Complex. В редких случаях может быть замечен на верхних уровнях. Частота появления — крайне низкая, но каждый зарегистрированный инцидент завершался 100% летальностью среди контактных лиц. Характеристики объекта: Нестабильная форма и оболочка, способна к фазовым искажениями; Воздействует на пси-поле и когнитивные центры жертвы. При приближении субъекта фиксируются: Острые головные боли; Самопроизвольное открытие/закрытие мебели и оборудования; Смена освещения на красный режим тревоги; Немедленный запуск протокола экстренной эвакуации. Контакт с субъектом зачастую невозможен. Все попытки взаимодействия или подавления приводят к мгновенной агрессии и гибели.'
        },
        '014': {
            id: '#014',
            name: 'Закованный Цепями',
            type: 'Биологическая Сущность',
            status: 'СОДЕРЖИТСЯ',
            lastContact: '1997-01-09 / 09:15 UTC',
            description: 'Объект был обнаружен в ходе глубоководной экспедиции в океаническом жёлобе. В результате операции Urbanshade понесла утрату сотрудника с позывным «ГУСЬ». Анализ видеозаписи с его костюма зафиксировал наличие паразитарных форм, провоцирующих резкие мутации живых организмов. Мутировавший субъект визуально напоминает деформированную рыбу-каплю с носовой частью, схожей с повреждениями от цепных связок. Объект постоянно испускает психотропный газ, вызывающий тяжёлые галлюцинации, ведущие к смерти.'
        },
        '045': {
            id: '#045',
            name: 'Система Безопасности и Навигации',
            type: 'Внутренняя система Hadal Complex',
            status: 'НАРУШЕНО',
            lastContact: '2024-06-23 / 23:00 UTC',
            description: 'Система Безопасности и Навигации (СБН) — централизованный модуль Hadal Complex, обеспечивающий контроль передвижений персонала, мониторинг в реальном времени и автоматическую реакцию на внутренние угрозы. Интегрирована с видеонаблюдением, биометрическими датчиками, шлюзами и маршрутами эвакуации. СБН функционирует автономно при любых отказах внешней инфраструктуры. Навигационный модуль строит адаптивные маршруты с учётом заблокированных зон и угроз. Система работает на базе ИИ и фрагментированного сознания бывшего диспетчера Даниэля Мозалевского, по чьему распоряжению в строгой секретности был инициирован её запуск.'
        },
        '072': {
            id: '#072',
            name: 'Хорошие Люди',
            type: 'Биологическая Сущность',
            status: 'СОДЕРЖИТСЯ',
            lastContact: '2011-12-15 / 08:00 UTC',
            description: 'Термин «Хорошие Люди» используется персоналом в качестве условного обозначения аномального субъекта, возникшего в результате побочного воздействия фрагмента объекта #███ на испытуемого [14-88: Доминик Мозалевский]. В течение нескольких минут после контакта испытуемый прошёл агрессивную фазу мутации, утрачивая все признаки человеческой морфологии. Результирующая форма — мясоподобное образование, обладающее высоким уровнем патогенного и ментального воздействия. В ходе последовавшего за этим саботажа неустановленного характера, под влияние субъекта попали ещё 108 сотрудников. Под воздействием объекта наблюдались поведенческие отклонения, утрата коммуникативных функций и дальнейшее исчезновение персонала. Текущее местоположение существ предположительно локализованы за закрытыми дверями нижнего сектора Hadal Complex. Все известные проходы в данный сектор были технически изолированы и заблокированы.'
        },
        '099': {
            id: '#099',
            name: 'Пустотные Сгустки',
            type: 'Неизвестное Глубоководное Образование',
            status: 'ИССЛЕДУЕТСЯ',
            lastContact: '2001-09-11 / 18:45 UTC',
            description: 'Объект представляет собой аморфную массу неизвестной природы, визуально напоминающую черную вязкую субстанцию с наличием множественных глазообразных образований различного цвета. Обнаружен на глубине 13 км под водой в ходе автономного погружения группой водолазов [Kolbaz, Freon]. Идентифицированные варианты глазных образований: Синий, Фиолетовый, Желтый, Бирюзовый, Красный. Поведенческие корреляции: Красные глаза — выраженная агрессия; Бирюзовые глаза — высокая активность и подвижность; Остальные цвета — неопределённые поведенческие паттерны. На протяжении последнего месяца зафиксированы многочисленные сообщения от персонала о визуальных проявлениях объекта внутри защитных шкафов и закрытых отсеков. Анализ показал, что более 40% стандартных шкафов подверглись внутреннему заражению. При открытии, субстанция осуществляет немедленный захват субъекта, сопровождающийся его полной деструкцией. Причина гибели: не установлена. По рабочей гипотезе исследовательского отдела (НИО), воздействие объекта вызывает дезинтеграцию органических структур до атомарного уровня, что может быть связано с антиматериальной природой сгустка. Механизм данной реакции остаётся невыясненным и не поддаётся моделированию стандартными средствами.'
        },
        '177': {
            id: '#177',
            name: 'Розовый Удильщик',
            type: 'Биологическая Сущность',
            status: 'СОДЕРЖИТСЯ',
            lastContact: '1995-01-07 / 23:21 UTC',
            description: 'В рамках программы FELINEX была разработана экспериментальная инъекция, направленная на создание гуманоидных гибридов с фелинной морфологией (т.н. «кошко-люди»). Целью являлось улучшение сенсорики, рефлексов и социальной адаптивности объектов. Первичный прототип был введён испытуемому с идентификатором [22-8: Иван]. Вопреки ожиданиям исследовательской группы, результатом инъекции стало формирование крайне агрессивного и аномального организма, условно классифицированного как "Розовый Удильщик", с примерными габаритами 3×3 метра. Цвет аномалии: ярко-розовый. Полное отсутствие ожидаемых фелинных признаков. Не наблюдается мерцание освещения при появлении (в отличие от объекта #014). При манифестации объекта фиксируется продолжительный и крайне громкий крик, вызывающий дезориентацию у персонала. Уровень угрозы: МАКСИМАЛЬНЫЙ!'
        },
        '265': {
            id: '#265',
            name: 'Обиталище Демонов',
            type: 'Биологическая Сущность',
            status: 'НАРУШЕНО',
            lastContact: '1992-10-03 / 03:03 UTC',
            description: 'Объект представляет собой агрессивную биологическую аномалию, внешне схожую с глубоководным удильщиком. Характерной особенностью являются множественные люминесцентные образования в области ротовой полости, используемые предположительно для дезориентации жертвы. Объект проявляет выраженную преследующую активность: цель отслеживается до полной нейтрализации, включая попытки укрытия в стандартных защитных модулях (шкафах укрытия и аналогичных конструкциях). Объект демонстрирует способность таранить и повреждать защитные укрытия, что приводит к летальному исходу для укрывающегося сотрудника. Появление объекта сопровождается следующими признаками: Интервальный мерцающий режим освещения, переходящий в полное отключение света; Звук высокоинтенсивного металлического скрежета неизвестного происхождения. Ввиду специфической внешности и поведенческих черт, персоналом комплекса объект неформально ассоциируется с начальником Марианского сектора — Артемием Станиславиком. Данная ассоциация не имеет научного подтверждения, однако может указывать на потенциальное происхождение объекта или эффект психофизиологического отражения у сотрудников.'
        }
    };

    let zIndexCounter = 200; // Counter for managing z-index of windows

    const errorMessages = [
        "Ошибка 0x0000007F: Сбой ядра",
        "Нарушение доступа к памяти",
        "Соединение с комплексом потеряно",
        "CRITICAL_PROCESS_DIED",
        "UNEXPECTED_KERNEL_MODE_TRAP",
        "PAGE_FAULT_IN_NONPAGED_AREA",
        "Загрузка системных драйверов нарушена",
        "Обнаружена критическая уязвимость",
        "Потеря контроля над системой",
        "Внедрение вредоносного кода"
    ];

    let glitchInterval;
    let errorPopupInterval;


    // --- Helper to update z-index on window click ---
    function bringToFront(windowElement) {
        zIndexCounter++;
        windowElement.style.zIndex = zIndexCounter;
    }

    // --- Function to add window to taskbar ---
    function addTaskbarButton(windowElement) {
        const title = windowElement.querySelector('.os-window-title').textContent;
        const button = document.createElement('button');
        button.classList.add('taskbar-app-button');
        button.textContent = title.split('\\').pop().replace('.EXE', ''); // Display only the app name
        button.dataset.windowId = windowElement.id; // Store window ID for easy lookup
        taskbarApps.appendChild(button);

        // Make the button active when the window is active
        if (windowElement.classList.contains('active') && !windowElement.classList.contains('hidden')) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            if (windowElement.classList.contains('active') && !windowElement.classList.contains('hidden')) {
                // If active, minimize it
                windowElement.classList.add('hidden');
                button.classList.remove('active');
            } else {
                // If minimized or inactive, activate it
                document.querySelectorAll('.taskbar-app-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.os-window').forEach(win => {
                    win.classList.remove('active');
                    win.classList.add('hidden'); // Ensure others are hidden
                });

                windowElement.classList.remove('hidden');
                windowElement.classList.add('active');
                bringToFront(windowElement);
                button.classList.add('active');
            }
        });
    }

    // --- Function to remove window from taskbar ---
    function removeTaskbarButton(windowId) {
        const buttonToRemove = document.querySelector(`.taskbar-app-button[data-window-id="${windowId}"]`);
        if (buttonToRemove) {
            buttonToRemove.remove();
        }
    }


    // --- Make windows draggable and resizable ---
    function makeWindowInteractive(windowElement) {
        const titleBar = windowElement.querySelector('.os-window-titlebar');
        const minimizeBtn = windowElement.querySelector('.os-window-button.minimize');
        const maximizeBtn = windowElement.querySelector('.os-window-button.maximize');
        const closeBtn = windowElement.querySelector('.os-window-button.close');

        let isDragging = false;
        let offset = { x: 0, y: 0 };
        let originalWidth, originalHeight, originalX, originalY; // For maximize/restore

        // Dragging
        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.os-window-button')) return; // Don't drag if clicking buttons

            isDragging = true;
            windowElement.style.cursor = 'grabbing';
            offset.x = e.clientX - windowElement.getBoundingClientRect().left;
            offset.y = e.clientY - windowElement.getBoundingClientRect().top;

            bringToFront(windowElement); // Bring to front on drag start
            windowElement.classList.remove('maximized'); // Exit maximized state on drag
            const taskbarBtn = document.querySelector(`.taskbar-app-button[data-window-id="${windowElement.id}"]`);
            if (taskbarBtn) taskbarBtn.classList.add('active'); // Keep taskbar button active
        });

        desktop.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            let newX = e.clientX - offset.x;
            let newY = e.clientY - offset.y;

            // Boundary checks
            newX = Math.max(0, Math.min(newX, window.innerWidth - windowElement.offsetWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight - windowElement.offsetHeight - 40)); // Account for taskbar

            windowElement.style.left = `${newX}px`;
            windowElement.style.top = `${newY}px`;
        });

        desktop.addEventListener('mouseup', () => {
            isDragging = false;
            windowElement.style.cursor = 'default';
        });

        // Resizing (done via CSS `resize: both` and `min-width/height`)
        // To handle z-index on resize, we can just call bringToFront on mousedown on the window itself
        windowElement.addEventListener('mousedown', (e) => {
            // Only bring to front if not clicking a button or titlebar for dragging
            if (!e.target.closest('.os-window-button') && !e.target.closest('.os-window-titlebar')) {
                bringToFront(windowElement);
            }
            const taskbarBtn = document.querySelector(`.taskbar-app-button[data-window-id="${windowElement.id}"]`);
            if (taskbarBtn) {
                document.querySelectorAll('.taskbar-app-button').forEach(btn => btn.classList.remove('active'));
                taskbarBtn.classList.add('active');
            }
        });


        // Minimize
        minimizeBtn.addEventListener('click', () => {
            windowElement.classList.add('hidden');
            const taskbarBtn = document.querySelector(`.taskbar-app-button[data-window-id="${windowElement.id}"]`);
            if (taskbarBtn) taskbarBtn.classList.remove('active');
        });

        // Maximize/Restore
        maximizeBtn.addEventListener('click', () => {
            if (windowElement.classList.contains('maximized')) {
                // Restore
                windowElement.classList.remove('maximized');
                windowElement.style.width = originalWidth;
                windowElement.style.height = originalHeight;
                windowElement.style.left = originalX;
                windowElement.style.top = originalY;
            } else {
                // Maximize
                originalWidth = windowElement.style.width;
                originalHeight = windowElement.style.height;
                originalX = windowElement.style.left;
                originalY = windowElement.style.top;

                windowElement.classList.add('maximized');
                bringToFront(windowElement);
            }
        });

        // Close
        closeBtn.addEventListener('click', () => {
            windowElement.classList.remove('active');
            windowElement.classList.add('hidden'); // Ensure it's fully hidden
            removeTaskbarButton(windowElement.id);
        });
    }

    // --- Function to manage window visibility (show/hide) ---
    function toggleWindow(windowElement) {
        if (windowElement.classList.contains('active') && !windowElement.classList.contains('hidden')) {
            // Already active, minimize it
            windowElement.classList.add('hidden');
        } else {
            // If hidden or inactive, activate it
            // Hide all other active windows first
            document.querySelectorAll('.os-window.active:not(.hidden)').forEach(win => {
                win.classList.remove('active');
                win.classList.add('hidden');
                const taskbarBtn = document.querySelector(`.taskbar-app-button[data-window-id="${win.id}"]`);
                if (taskbarBtn) taskbarBtn.classList.remove('active');
            });
            windowElement.classList.remove('hidden');
            windowElement.classList.add('active');
            bringToFront(windowElement);

            // Update taskbar button active state
            document.querySelectorAll('.taskbar-app-button').forEach(btn => btn.classList.remove('active'));
            const taskbarBtn = document.querySelector(`.taskbar-app-button[data-window-id="${windowElement.id}"]`);
            if (taskbarBtn) taskbarBtn.classList.add('active');
            
            // For console, focus input
            if (windowElement.id === 'consoleContainer') {
                consoleInput.focus();
                consoleOutput.scrollTop = consoleOutput.scrollHeight; // Scroll to bottom
            }
        }
    }


    // --- Clock function for Taskbar ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000); // Update every second


    // --- Progress Bar Animation ---
    function animateProgressBar(duration, callback) {
        progressBarContainer.classList.add('active');
        progressBar.style.width = '0%';
        progressStatus.textContent = 'ИНИЦИАЛИЗАЦИЯ...';

        let startTime = null;
        const messages = [
            "ЗАГРУЗКА ЯДРА СИСТЕМЫ [███         ] 10%",
            "ПРОВЕРКА ЦЕЛОСТНОСТИ ФАЙЛОВ [██████      ] 50%",
            "ЗАПУСК МОДУЛЯ УПРАВЛЕНИЯ [█████████   ] 80%",
            "СТАРТОВЫЕ ПРОТОКОЛЫ [██████████  ] 90%",
            "ГОТОВНОСТЬ СИСТЕМЫ [████████████] 100%"
        ];
        let messageIndex = 0;

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            const width = Math.min(progress * 100, 100);
            progressBar.style.width = `${width}%`;

            if (width >= (messageIndex + 1) * (100 / messages.length) && messageIndex < messages.length) {
                progressStatus.textContent = messages[messageIndex];
                messageIndex++;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                progressBar.style.width = '100%';
                progressStatus.textContent = messages[messages.length - 1]; // Ensure last message is shown
                setTimeout(callback, 500); // Small delay after completion
            }
        }
        requestAnimationFrame(step);
    }


    // --- Hacking Animation ---
    function createErrorPopup(isBlue = false) {
        const popup = document.createElement('div');
        popup.classList.add('error-popup');
        if (isBlue) {
            popup.classList.add('blue');
        }

        popup.style.width = `${Math.random() * 200 + 150}px`; // 150-350px
        popup.style.height = `${Math.random() * 100 + 80}px`; // 80-180px
        popup.style.left = `${Math.random() * (window.innerWidth - parseInt(popup.style.width))}px`;
        popup.style.top = `${Math.random() * (window.innerHeight - parseInt(popup.style.height))}px`;
        
        popup.innerHTML = `
            <span>${errorMessages[Math.floor(Math.random() * errorMessages.length)]}</span>
            <br>
            <span>Нажмите ОК для продолжения</span>
            <button class="error-ok-button">ОК</button>
        `;
        document.body.appendChild(popup);

        // Play error sound
        errorSound.currentTime = 0; // Reset to start
        errorSound.volume = 0.3; // Lower volume for rapid firing
        errorSound.play().catch(e => console.error("Error playing error sound:", e));

        // Close button functionality (optional, as they will be cleared later)
        popup.querySelector('.error-ok-button').addEventListener('click', () => {
            popup.remove();
        });
    }

    function startHackingAnimation() {
        let popupCount = 0;
        const maxPopups = 50; // Limit the total number of popups for performance
        let isBlue = false;

        errorPopupInterval = setInterval(() => {
            if (popupCount < maxPopups) {
                createErrorPopup(isBlue);
                popupCount++;
                isBlue = !isBlue; // Alternate between red and blue
            } else {
                // If max popups reached, still create new ones but also remove old ones
                if (document.querySelectorAll('.error-popup').length > 10) { // Keep a certain number on screen
                    document.querySelector('.error-popup').remove();
                }
                createErrorPopup(isBlue);
                isBlue = !isBlue;
            }
            // Trigger a screen glitch every few popups
            if (popupCount % 3 === 0) {
                screenGlitchOverlay.classList.add('active');
                setTimeout(() => {
                    screenGlitchOverlay.classList.remove('active');
                }, 100);
            }
        }, 150); // Create a new popup every 150ms

        setTimeout(() => {
            clearInterval(errorPopupInterval);
            // Clear all error popups
            document.querySelectorAll('.error-popup').forEach(popup => popup.remove());
            screenGlitchOverlay.classList.remove('active'); // Ensure glitch is off
            
            // Show BSOD
            desktop.style.display = 'none'; // Hide desktop
            bsodScreen.classList.add('active');
            backgroundAudio.pause(); // Stop background music

            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&index=1'; // Redirect after 2 seconds
            }, 2000);

        }, 6000); // Hacking animation lasts for 6 seconds (5-7s range)
    }


    // --- Console Logic ---
    function appendToConsole(text, color = 'green') {
        const p = document.createElement('p');
        p.textContent = text;
        p.style.color = color;
        consoleOutput.appendChild(p);
        consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll to bottom
    }

    function handleConsoleCommand() {
        const command = consoleInput.value.trim();
        appendToConsole(`C:\\> ${command}`);
        consoleInput.value = ''; // Clear input

        if (command === 'protocol delta') {
            appendToConsole("Executing 'unlock-protocol delta'...", "cyan");
            appendToConsole("Initiating system override protocols...", "yellow");
            setTimeout(startHackingAnimation, 1000); // Start hacking animation after a short delay
        } else if (command === 'help') {
            appendToConsole("Доступные команды:");
            appendToConsole("  help - Показать список команд");
            appendToConsole("  clear - Очистить консоль");
            appendToConsole("  exit - Закрыть консоль");
            appendToConsole("  protocol delta - ...", "red");
        } else if (command === 'clear') {
            consoleOutput.innerHTML = ''; // Clear content
            appendToConsole("URBANSHADE TECH CORP. [Version 5.1.2600]");
            appendToConsole("(C) Copyright 1990-2025 URBANSHADE TECH CORP.");
            appendToConsole("");
        } else if (command === 'exit') {
            toggleWindow(consoleWindow);
        }
        else {
            appendToConsole(`'${command}' не является внутренней или внешней командой, исполняемой программой или пакетным файлом.`, "red");
        }
        consoleInput.focus();
    }

    consoleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleConsoleCommand();
        }
    });


    // --- Function to handle category changes ---
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and content
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.category-content').forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button and its corresponding content
            button.classList.add('active');
            const targetCategory = button.dataset.category;
            document.getElementById(`${targetCategory}Content`).classList.add('active');
        });
    });

    // --- Complex and Operations card expansion ---
    document.querySelectorAll('.complex-card, .operation-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });


    // --- Function management for active/inactive steps ---
    function showStep(stepElement) {
        const currentActiveStep = document.querySelector('.modal-container.active, .desktop-screen.active');
        if (currentActiveStep) {
            currentActiveStep.classList.add('inactive');
            currentActiveStep.addEventListener('animationend', () => {
                currentActiveStep.classList.remove('active', 'inactive');
                stepElement.classList.add('active');
                if (stepElement === desktop) {
                    // Initialize interactive windows and taskbar buttons when desktop becomes active
                    makeWindowInteractive(mainOsWindow);
                    makeWindowInteractive(consoleWindow);
                    addTaskbarButton(mainOsWindow);
                    addTaskbarButton(consoleWindow); // Add console to taskbar
                    updateClock(); // Initial clock update
                }
            }, { once: true });
        } else {
            stepElement.classList.add('active');
            if (stepElement === desktop) {
                // Initialize interactive windows and taskbar buttons when desktop becomes active
                makeWindowInteractive(mainOsWindow);
                makeWindowInteractive(consoleWindow);
                addTaskbarButton(mainOsWindow);
                addTaskbarButton(consoleWindow);
                updateClock();
            }
        }
    }


    // --- 1. Sound Activation Step ---
    activateSoundBtn.addEventListener('click', () => {
        backgroundAudio.volume = 0.5;
        backgroundAudio.play()
            .then(() => {
                console.log("Фоновое аудио активировано.");
                showStep(authStep);
                passwordInput.focus();
            })
            .catch(e => {
                console.error("Не удалось воспроизвести фоновое аудио:", e);
                alert("Не удалось включить звук. Возможно, браузер блокирует автовоспроизведение без взаимодействия. Продолжаем без звука.");
                showStep(authStep);
                passwordInput.focus();
            });
    });

    // --- 2. Authorization Window ---
    const handleAuthAttempt = () => {
        const enteredPassword = passwordInput.value.toLowerCase();
        if (enteredPassword === CORRECT_PASSWORD) {
            authErrorMessage.classList.remove('active');
            passwordInput.value = '';
            
            // Start progress bar animation
            animateProgressBar(3000, () => { // 3 seconds for progress bar
                progressBarContainer.classList.remove('active'); // Hide progress bar
                showStep(desktop); // Transition to desktop
                // Activate the first object item by default
                setTimeout(() => {
                    const firstItem = document.querySelector('.object-item');
                    if (firstItem) {
                        firstItem.click();
                    }
                }, 600); // Small delay to allow desktop to appear
            });

        } else {
            errorSound.currentTime = 0;
            errorSound.volume = 0.7; // Louder for auth error
            errorSound.play().catch(e => console.log("Не удалось воспроизвести звук ошибки:", e));
            authErrorMessage.classList.add('active');
            passwordInput.value = '';
            passwordInput.focus();

            screenGlitchOverlay.classList.add('active');
            screenGlitchOverlay.addEventListener('animationend', () => {
                screenGlitchOverlay.classList.remove('active');
            }, { once: true });
        }
    };

    enterAuthBtn.addEventListener('click', handleAuthAttempt);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAuthAttempt();
        }
    });

    // --- 3. Object Interface ---
    objectListContainer.addEventListener('click', (e) => {
        const selectedItem = e.target.closest('.object-item');
        if (selectedItem) {
            document.querySelectorAll('.object-item').forEach(item => {
                item.classList.remove('selected');
            });
            selectedItem.classList.add('selected');

            const objectId = selectedItem.dataset.id;
            const data = objectData[objectId];

            if (data) {
                detailsTitle.textContent = `[ ОБЪЕКТ ${data.id} : ${data.name.toUpperCase()} ]`;
                detailsId.textContent = data.id;
                detailsType.textContent = data.type;
                detailsStatus.textContent = data.status;
                detailsLastContact.textContent = data.lastContact;
                // Changed from typeWriter to direct textContent assignment
                detailsDescription.textContent = data.description; 
            } else {
                detailsTitle.textContent = '[ ДАННЫЕ ОБЪЕКТА НЕДОСТУПНЫ ]';
                detailsId.textContent = '---';
                detailsType.textContent = '---';
                detailsStatus.textContent = '---';
                detailsLastContact.textContent = '---';
                // Changed from typeWriter to direct textContent assignment
                detailsDescription.textContent = 'Секретная информация об этом объекте отсутствует в базе данных. Проверьте запрос.';
            }
        }
    });

    // --- Desktop Icon Click Handlers ---
    document.getElementById('urbanshade-icon').addEventListener('dblclick', () => {
        toggleWindow(mainOsWindow);
    });
    document.getElementById('my-documents-icon').addEventListener('dblclick', () => {
        document.getElementById('accessDeniedModal').classList.add('active');
    });
    document.getElementById('control-panel-icon').addEventListener('dblclick', () => {
        document.getElementById('accessDeniedModal').classList.add('active');
    });
    document.getElementById('console-icon').addEventListener('dblclick', () => {
        toggleWindow(consoleWindow);
    });

    // --- Close modal button for access denied ---
    document.querySelectorAll('.close-modal-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal-container').classList.remove('active');
        });
    });


    // Initial setup: show the first step
    showStep(soundActivationStep);
});