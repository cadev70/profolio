<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import { NAV_ROUTES, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES, THEMES } from '../utils/constants'

const { t, locale } = useI18n()
const route = useRoute()
const { theme, toggleTheme } = useTheme()

const isMenuOpen = ref(false)
const isLangMenuOpen = ref(false)

const navLinks = computed(() => [
  { name: t('nav.home'), path: NAV_ROUTES.HOME },
  { name: t('nav.projects'), path: NAV_ROUTES.PROJECTS },
  { name: t('nav.about'), path: NAV_ROUTES.ABOUT },
  { name: t('nav.contact'), path: NAV_ROUTES.CONTACT }
])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

const setLocale = (lang) => {
  locale.value = lang
  isLangMenuOpen.value = false
  localStorage.setItem(LOCALE_STORAGE_KEY, lang)
}

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <span class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="currentColor" class="logo-bg"/>
            <path d="M8 12L14 16L8 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 20H24" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="logo-text">Carly<span class="logo-accent">.dev</span></span>
      </RouterLink>

      <nav class="nav-desktop">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: isActive(link.path) }"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <div class="nav-actions">
        <!-- Language Switcher -->
        <div class="lang-switcher">
          <button
            class="btn btn-ghost btn-icon lang-btn"
            @click="toggleLangMenu"
            :aria-label="t('language.select')"
            :title="t('language.select')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
          <Transition name="dropdown">
            <div v-if="isLangMenuOpen" class="lang-dropdown">
              <button
                v-for="lang in SUPPORTED_LOCALES"
                :key="lang"
                class="lang-option"
                :class="{ active: locale === lang }"
                @click="setLocale(lang)"
              >
                {{ t(`language.${lang}`) }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Theme Toggle -->
        <button
          class="btn btn-ghost btn-icon theme-toggle"
          @click="toggleTheme"
          :aria-label="theme === THEMES.LIGHT ? t('theme.dark') : t('theme.light')"
          :title="theme === THEMES.LIGHT ? t('theme.dark') : t('theme.light')"
        >
          <svg v-if="theme === THEMES.LIGHT" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          class="btn btn-ghost btn-icon menu-toggle"
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <nav v-if="isMenuOpen" class="nav-mobile">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link-mobile"
          :class="{ active: isActive(link.path) }"
          @click="closeMenu"
        >
          {{ link.name }}
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background: var(--color-background-alt);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cta);
}

.logo-bg {
  fill: var(--color-cta);
}

.logo-accent {
  color: var(--color-cta);
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.nav-link {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  padding: var(--space-sm) 0;
  position: relative;
  transition: color var(--transition-fast);
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-cta);
  transition: width var(--transition-base);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-primary);
}

.nav-link.active::after,
.nav-link:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.lang-switcher {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + var(--space-sm));
  right: 0;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  min-width: 140px;
  z-index: var(--z-dropdown);
}

.lang-option {
  display: block;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.lang-option:hover {
  background: var(--color-border);
}

.lang-option.active {
  color: var(--color-cta);
  font-weight: 600;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-toggle {
  display: none;
}

/* Mobile Menu */
.nav-mobile {
  display: none;
  padding: var(--space-md) var(--space-lg) var(--space-lg);
  background: var(--color-background-alt);
  border-bottom: 1px solid var(--color-border);
}

.nav-link-mobile {
  display: block;
  padding: var(--space-md) 0;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-fast);
  cursor: pointer;
}

.nav-link-mobile:last-child {
  border-bottom: none;
}

.nav-link-mobile:hover,
.nav-link-mobile.active {
  color: var(--color-cta);
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-mobile {
    display: block;
  }

  .navbar-container {
    height: 70px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}
</style>
