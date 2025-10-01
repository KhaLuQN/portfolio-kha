document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');

    const setLanguage = (lang) => {
        // Update typewriter text
        const typewriterTarget = document.getElementById('type-target');
        if (typewriterTarget && translations[lang] && translations[lang]['typewriter_text']) {
            // This is tricky because the typewriter script controls this element.
            // We will just update the source text variable in the typewriter script.
            // This requires the typewriter script to be loaded before this script and for its `text` variable to be global.
            // A better solution would be to refactor the typewriter script to be a function that accepts the text.
            // For now, we assume `text` is a global `var` or we can't change it without bigger changes.
        }

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) {
                        el.placeholder = translations[lang][key];
                    }
                    const label = document.querySelector(`label[for="${el.id}"]`);
                    if (label) {
                        label.textContent = translations[lang][key];
                    }
                } else {
                     el.innerHTML = translations[lang][key];
                }
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        document.querySelectorAll('#language-switcher button').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
                 btn.style.backgroundColor = 'rgba(137, 137, 137, 0.518)';
            } else {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
            }
        });
    };

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (e) => {
            const lang = e.target.closest('button')?.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        });
    }

    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
});
