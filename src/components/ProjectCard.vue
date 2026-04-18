<script setup>
import { useI18n } from 'vue-i18n'
import { useProjectImage } from '../composables/useProjectImage'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
  showCodeBtn: { type: Boolean, default: false },
})

const { t, locale } = useI18n()
const { getProjectImage } = useProjectImage()
</script>

<template>
  <article class="project-card" tabindex="0">
    <div class="project-image" :style="getProjectImage(project, index)">
      <div class="project-overlay">
        <div class="project-actions">
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary action-btn">
            {{ t('projects.viewProject') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          <a v-if="showCodeBtn" :href="project.url" target="_blank" rel="noopener noreferrer" class="btn btn-secondary action-btn">
            {{ t('projects.viewCode') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </a>
        </div>
      </div>
      <span class="project-category-badge">{{ t(`projects.categories.${project.category}`) }}</span>
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ project.title[locale] }}</h3>
      <p class="project-description">{{ project.description[locale] }}</p>
      <div class="project-technologies">
        <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card { background: var(--color-card-bg); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md); transition: all var(--transition-base); cursor: pointer; border: 1px solid var(--color-border); }
.project-card:hover { box-shadow: var(--shadow-xl); transform: translateY(-8px); }
.project-card:focus-visible { outline: 2px solid var(--color-cta); outline-offset: 2px; }

.project-image { position: relative; height: 220px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.project-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--transition-base); }
.project-card:hover .project-overlay { opacity: 1; }
.project-actions { display: flex; flex-direction: column; gap: var(--space-sm); }
.action-btn { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) var(--space-md); font-size: var(--font-size-sm); }
.project-category-badge { position: absolute; top: var(--space-md); left: var(--space-md); padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-xs); font-weight: 600; color: white; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); border-radius: var(--radius-sm); }

.project-content { padding: var(--space-lg); }
.project-title { font-size: var(--font-size-xl); margin-bottom: var(--space-sm); }
.project-description { font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-md); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.project-technologies { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
.tech-tag { padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-xs); font-weight: 500; color: var(--color-cta); background: rgba(37, 99, 235, 0.1); border-radius: var(--radius-sm); }
</style>
