<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import portraitImage from '../assets/images/carly.png'

const { t } = useI18n()
</script>

<template>
  <section class="about-preview section">
    <div class="container">
      <div class="about-grid">
        <div class="about-image">
          <div class="image-placeholder">
            <img :src="portraitImage" alt="Carly Tang" class="profile-img" />
          </div>
          <div class="image-decoration"></div>
        </div>
        <div class="about-content">
          <h2 class="section-title">{{ t('about.title') }}</h2>
          <p class="about-intro">{{ t('about.intro') }}</p>
          <p class="about-text">{{ t('about.description') }}</p>
          <RouterLink to="/about" class="btn btn-secondary">
            {{ t('about.learnMore') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-preview { background: var(--color-background-alt); }
.about-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--space-3xl); align-items: center; }

.about-image { position: relative; max-width: 380px; }
.image-placeholder { width: 100%; aspect-ratio: 1; border-radius: var(--radius-2xl); overflow: hidden; position: relative; z-index: 1; }
.profile-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.image-decoration { position: absolute; inset: 15px; border: 3px solid var(--color-cta); border-radius: var(--radius-2xl); transform: translate(15px, 15px); }

.about-content { max-width: 540px; }
.about-intro { font-size: var(--font-size-lg); color: var(--color-cta); font-weight: 600; margin-bottom: var(--space-md); }
.about-text { color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-xl); }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; text-align: center; }
  .about-image { max-width: 280px; margin: 0 auto; }
  .about-content .btn { width: 100%; justify-content: center; }
  .section-title::after { left: 50%; transform: translateX(-50%); }
}
</style>
