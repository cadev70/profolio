<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const submitStatus = ref('idle')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'
  
  await new Promise(resolve => setTimeout(resolve, 1500))

  submitStatus.value = 'error'
  isSubmitting.value = false

  setTimeout(() => { submitStatus.value = 'idle' }, 4000)
}
</script>

<template>
  <div class="contact-view">
    <div class="container">
      <header class="contact-header">
        <h1 class="page-title">{{ t('contact.title') }}</h1>
        <p class="page-subtitle">{{ t('contact.subtitle') }}</p>
      </header>

      <div class="contact-content">
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label" for="name">{{ t('contact.form.name') }}</label>
            <input id="name" v-model="form.name" type="text" class="input" :placeholder="t('contact.form.namePlaceholder')" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">{{ t('contact.form.email') }}</label>
            <input id="email" v-model="form.email" type="email" class="input" :placeholder="t('contact.form.emailPlaceholder')" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="message">{{ t('contact.form.message') }}</label>
            <textarea id="message" v-model="form.message" class="textarea" :placeholder="t('contact.form.messagePlaceholder')" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('contact.form.sending') }}</span>
            <span v-else>{{ t('contact.form.submit') }}</span>
            <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
          <Transition name="fade">
            <p v-if="submitStatus === 'error'" class="error-message">{{ t('contact.form.error') }}</p>
          </Transition>
        </form>

        <aside class="contact-info">
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Email</h4>
              <a href="mailto:carly.dev.70@gmail.com">{{ t('contact.info.email') }}</a>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Location</h4>
              <p>{{ t('contact.info.location') }}</p>
            </div>
          </div>
          <!-- <div class="info-card highlight">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="info-content">
              <h4>Status</h4>
              <p>{{ t('contact.info.availability') }}</p>
            </div>
          </div> -->
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-view { padding: var(--space-2xl) 0 var(--space-4xl); }
.contact-header { text-align: center; margin-bottom: var(--space-2xl); }
.page-title { font-size: var(--font-size-5xl); margin-bottom: var(--space-md); }
.page-subtitle { font-size: var(--font-size-lg); color: var(--color-text-muted); max-width: 500px; margin: 0 auto; }

.contact-content { display: grid; grid-template-columns: 1fr 320px; gap: var(--space-2xl); max-width: 900px; margin: 0 auto; }

.contact-form { background: var(--color-card-bg); padding: var(--space-xl); border-radius: var(--radius-xl); border: 1px solid var(--color-border); }
.submit-btn { width: 100%; justify-content: center; gap: var(--space-sm); padding: var(--space-md) var(--space-xl); font-size: var(--font-size-base); margin-top: var(--space-sm); }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.error-message { text-align: center; color: #EF4444; font-weight: 600; margin-top: var(--space-md); padding: var(--space-md); background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-lg); }

.contact-info { display: flex; flex-direction: column; gap: var(--space-md); }
.info-card { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); background: var(--color-card-bg); border-radius: var(--radius-xl); border: 1px solid var(--color-border); transition: all var(--transition-base); cursor: pointer; }
.info-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.info-card.highlight { background: linear-gradient(135deg, var(--color-cta) 0%, var(--color-accent) 100%); border: none; }
.info-card.highlight .info-icon { background: rgba(255, 255, 255, 0.2); color: white; }
.info-card.highlight .info-content h4, .info-card.highlight .info-content p { color: white; }
.info-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(37, 99, 235, 0.1); border-radius: var(--radius-lg); color: var(--color-cta); flex-shrink: 0; }
.info-content h4 { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-xs); }
.info-content a, .info-content p { font-size: var(--font-size-base); font-weight: 600; color: var(--color-primary); }
.info-content a:hover { color: var(--color-cta); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .contact-content { grid-template-columns: 1fr; }
  .page-title { font-size: var(--font-size-3xl); }
}
</style>
