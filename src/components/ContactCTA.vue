<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="contact-cta section">
    <div class="container">
      <div class="cta-decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">{{ t('contact.title') }}</h2>
        <p class="cta-text">{{ t('contact.subtitle') }}</p>
        <RouterLink to="/contact" class="btn btn-primary cta-btn">
          {{ t('hero.cta.contact') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-cta { position: relative; overflow: hidden; }
.contact-cta .container { position: relative; z-index: 1; }

.cta-content { position: relative; z-index: 1; text-align: center; max-width: 600px; margin: 0 auto; padding: var(--space-3xl) 0; }
.cta-title { font-size: var(--font-size-4xl); margin-bottom: var(--space-md); }
.cta-text { font-size: var(--font-size-lg); color: var(--color-text-muted); margin-bottom: var(--space-xl); }
.cta-btn { padding: var(--space-md) var(--space-2xl); font-size: var(--font-size-lg); }

.cta-decoration { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.circle { position: absolute; border-radius: 50%; border: 2px solid var(--color-border); }
.circle-1 { width: 400px; height: 400px; top: -200px; left: -100px; }
.circle-2 { width: 300px; height: 300px; bottom: -150px; right: -50px; }
.circle-3 { width: 200px; height: 200px; top: 50%; right: 10%; transform: translateY(-50%); opacity: 0.5; }

@media (max-width: 768px) { .cta-title { font-size: var(--font-size-2xl); } }
</style>
