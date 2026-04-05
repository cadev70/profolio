import { createI18n } from 'vue-i18n'
import { message as enMessage } from './locales/en_US'
import { message as zhMessage } from './locales/zh_TW'
import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE } from '../utils/constants'

const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE

export const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
        en: enMessage,
        zh: zhMessage
    }
})

export default i18n
