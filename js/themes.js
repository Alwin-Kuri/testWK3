// Theme management system
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                name: 'Dark Mode',
                primary: '#0a0a0a',
                secondary: '#1a1a1a',
                tertiary: '#2a2a2a',
                accent: '#ffffff',
                text: '#ffffff',
                textSecondary: '#a0a0a0',
                textMuted: '#666666',
                border: '#333333'
            },
            light: {
                name: 'Light Mode',
                primary: '#ffffff',
                secondary: '#f8f9fa',
                tertiary: '#e9ecef',
                accent: '#000000',
                text: '#212529',
                textSecondary: '#6c757d',
                textMuted: '#adb5bd',
                border: '#dee2e6'
            },
            blue: {
                name: 'Ocean Blue',
                primary: '#0f172a',
                secondary: '#1e293b',
                tertiary: '#334155',
                accent: '#3b82f6',
                text: '#f1f5f9',
                textSecondary: '#cbd5e1',
                textMuted: '#94a3b8',
                border: '#475569'
            },
            purple: {
                name: 'Royal Purple',
                primary: '#1e1b4b',
                secondary: '#312e81',
                tertiary: '#4338ca',
                accent: '#8b5cf6',
                text: '#f3f4f6',
                textSecondary: '#d1d5db',
                textMuted: '#9ca3af',
                border: '#6366f1'
            },
            green: {
                name: 'Forest Green',
                primary: '#0f1f0f',
                secondary: '#1f2937',
                tertiary: '#374151',
                accent: '#10b981',
                text: '#f9fafb',
                textSecondary: '#d1d5db',
                textMuted: '#9ca3af',
                border: '#4b5563'
            },
            rose: {
                name: 'Rose Gold',
                primary: '#2d1b29',
                secondary: '#44273a',
                tertiary: '#5a3349',
                accent: '#f43f5e',
                text: '#fdf2f8',
                textSecondary: '#f3e8ff',
                textMuted: '#c084fc',
                border: '#7c2d12'
            },
            midnight: {
                name: 'Midnight',
                primary: '#000000',
                secondary: '#111111',
                tertiary: '#222222',
                accent: '#4a90e2',
                text: '#ffffff',
                textSecondary: '#cccccc',
                textMuted: '#888888',
                border: '#333333'
            },
            cream: {
                name: 'Cream',
                primary: '#faf7f2',
                secondary: '#f5f1e8',
                tertiary: '#ede7d9',
                accent: '#8b7355',
                text: '#3d3d3d',
                textSecondary: '#666666',
                textMuted: '#999999',
                border: '#d4c4a8'
            },
            slate: {
                name: 'Slate',
                primary: '#1e293b',
                secondary: '#334155',
                tertiary: '#475569',
                accent: '#f1f5f9',
                text: '#f8fafc',
                textSecondary: '#e2e8f0',
                textMuted: '#cbd5e1',
                border: '#64748b'
            },
            monochrome: {
                name: 'Monochrome',
                primary: '#ffffff',
                secondary: '#f0f0f0',
                tertiary: '#e0e0e0',
                accent: '#000000',
                text: '#000000',
                textSecondary: '#555555',
                textMuted: '#888888',
                border: '#cccccc'
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.setupThemeSelector();
        this.setupKeyboardShortcuts();
        this.setupSystemThemeDetection();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        } else {
            // Detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme(this.currentTheme);
    }
    
    setupThemeSelector() {
        const themeToggle = document.getElementById('themeToggle');
        const themeOptions = document.getElementById('themeOptions');
        const themeSelector = document.getElementById('themeSelector');
        
        if (!themeToggle || !themeOptions) return;
        
        // Toggle theme options
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeOptions.classList.toggle('active');
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!themeSelector.contains(e.target)) {
                themeOptions.classList.remove('active');
            }
        });
        
        // Handle theme selection
        themeOptions.addEventListener('click', (e) => {
            const themeOption = e.target.closest('.theme-option');
            if (themeOption) {
                const theme = themeOption.dataset.theme;
                this.setTheme(theme);
                themeOptions.classList.remove('active');
            }
        });
        
        // Update active state
        this.updateActiveThemeOption();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + T to toggle theme selector
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                const themeOptions = document.getElementById('themeOptions');
                themeOptions.classList.toggle('active');
            }
            
            // Alt + D for dark theme
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                this.setTheme('dark');
            }
            
            // Alt + L for light theme
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                this.setTheme('light');
            }
        });
    }
    
    setupSystemThemeDetection() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
        });
    }
    
    setTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        this.currentTheme = themeName;
        this.applyTheme(themeName);
        this.saveTheme(themeName);
        this.updateActiveThemeOption();
        this.triggerThemeChangeEvent();
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        // Apply CSS custom properties
        root.style.setProperty('--bg-primary', theme.primary);
        root.style.setProperty('--bg-secondary', theme.secondary);
        root.style.setProperty('--bg-tertiary', theme.tertiary);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--text-primary', theme.text);
        root.style.setProperty('--text-secondary', theme.textSecondary);
        root.style.setProperty('--text-muted', theme.textMuted);
        root.style.setProperty('--border', theme.border);
        
        // Set data attribute for theme-specific styles
        document.body.setAttribute('data-theme', themeName);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme.primary);
        
        // Animate theme change
        this.animateThemeChange();
    }
    
    updateMetaThemeColor(color) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = color;
    }
    
    animateThemeChange() {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--accent);
            opacity: 0.1;
            pointer-events: none;
            z-index: 9999;
            animation: themeRipple 0.6s ease-out;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            document.body.style.transition = '';
        }, 600);
    }
    
    saveTheme(themeName) {
        localStorage.setItem('portfolio-theme', themeName);
    }
    
    updateActiveThemeOption() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === this.currentTheme) {
                option.classList.add('active');
            }
        });
    }
    
    triggerThemeChangeEvent() {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: this.currentTheme,
                themeData: this.themes[this.currentTheme]
            }
        });
        document.dispatchEvent(event);
    }
    
    getTheme(themeName) {
        return this.themes[themeName] || this.themes[this.currentTheme];
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getAllThemes() {
        return this.themes;
    }
    
    addCustomTheme(name, themeData) {
        this.themes[name] = themeData;
        this.regenerateThemeOptions();
    }
    
    regenerateThemeOptions() {
        const themeOptions = document.getElementById('themeOptions');
        if (!themeOptions) return;
        
        themeOptions.innerHTML = '';
        
        Object.keys(this.themes).forEach(themeKey => {
            const theme = this.themes[themeKey];
            const option = document.createElement('button');
            option.className = 'theme-option';
            option.dataset.theme = themeKey;
            option.innerHTML = `
                <div class="theme-preview ${themeKey}-preview"></div>
                <span>${theme.name}</span>
            `;
            themeOptions.appendChild(option);
        });
        
        this.updateActiveThemeOption();
    }
}

// Theme-specific animations and effects
class ThemeEffects {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }
    
    init() {
        document.addEventListener('themeChanged', (e) => {
            this.applyThemeEffects(e.detail.theme);
        });
    }
    
    applyThemeEffects(themeName) {
        switch (themeName) {
            case 'dark':
                this.applyDarkEffects();
                break;
            case 'light':
                this.applyLightEffects();
                break;
            case 'blue':
                this.applyBlueEffects();
                break;
            case 'purple':
                this.applyPurpleEffects();
                break;
            case 'green':
                this.applyGreenEffects();
                break;
            case 'rose':
                this.applyRoseEffects();
                break;
            default:
                this.applyDefaultEffects();
        }
    }
    
    applyDarkEffects() {
        this.updateParticleColors('#ffffff');
        this.updateGlowEffects('rgba(255, 255, 255, 0.2)');
    }
    
    applyLightEffects() {
        this.updateParticleColors('#000000');
        this.updateGlowEffects('rgba(0, 0, 0, 0.1)');
    }
    
    applyBlueEffects() {
        this.updateParticleColors('#3b82f6');
        this.updateGlowEffects('rgba(59, 130, 246, 0.3)');
    }
    
    applyPurpleEffects() {
        this.updateParticleColors('#8b5cf6');
        this.updateGlowEffects('rgba(139, 92, 246, 0.3)');
    }
    
    applyGreenEffects() {
        this.updateParticleColors('#10b981');
        this.updateGlowEffects('rgba(16, 185, 129, 0.3)');
    }
    
    applyRoseEffects() {
        this.updateParticleColors('#f43f5e');
        this.updateGlowEffects('rgba(244, 63, 94, 0.3)');
    }
    
    applyDefaultEffects() {
        this.updateParticleColors('#ffffff');
        this.updateGlowEffects('rgba(255, 255, 255, 0.2)');
    }
    
    updateParticleColors(color) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.background = color;
        });
    }
    
    updateGlowEffects(shadowColor) {
        const glowElements = document.querySelectorAll('.profile-placeholder, .btn-primary');
        glowElements.forEach(element => {
            element.style.boxShadow = `0 0 30px ${shadowColor}`;
        });
    }
}

// Add custom CSS for theme animations
const themeAnimationStyles = document.createElement('style');
themeAnimationStyles.textContent = `
    @keyframes themeRipple {
        0% {
            transform: scale(0);
            opacity: 0.3;
        }
        50% {
            opacity: 0.1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .theme-transition {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .theme-option {
        transform: scale(1);
        transition: transform 0.2s ease;
    }
    
    .theme-option:hover {
        transform: scale(1.05);
    }
    
    .theme-option.active {
        transform: scale(1.1);
    }
`;
document.head.appendChild(themeAnimationStyles);

// Initialize theme system
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    window.themeEffects = new ThemeEffects(window.themeManager);
    
    // Add theme utilities to global scope
    window.setTheme = (theme) => window.themeManager.setTheme(theme);
    window.getCurrentTheme = () => window.themeManager.getCurrentTheme();
    window.getThemeData = (theme) => window.themeManager.getTheme(theme);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, ThemeEffects };
}