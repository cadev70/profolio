import { ref, watch, onMounted } from 'vue'
import { THEME_STORAGE_KEY, THEMES } from '../utils/constants'

const theme = ref(THEMES.LIGHT)

export function useTheme() {
    const toggleTheme = () => {
        theme.value = theme.value === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    }

    const setTheme = (newTheme) => {
        theme.value = newTheme
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme) {
            theme.value = savedTheme
        } else if (prefersDark) {
            theme.value = THEMES.DARK
        }

        document.documentElement.setAttribute('data-theme', theme.value)
    })

    watch(theme, (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    })

    return {
        theme,
        toggleTheme,
        setTheme
    }
}
