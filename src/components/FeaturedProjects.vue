<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProjects } from '../composables/useProjects'

const { t, locale } = useI18n()
const { projectData } = useProjects()

const projects = computed(() => projectData.value?.[locale.value]?.slice(0, 3) ?? [])

const projectImages = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
]
</script>

<template>
  <section class="featured-projects section">
    <div class="container">
      <header class="section-header">
        <h2 class="section-title">{{ t('projects.title') }}</h2>
        <RouterLink to="/projects" class="view-all-link">
          {{ t('projects.viewAll') }}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </RouterLink>
      </header>

      <div class="projects-grid">
        <article v-for="(project, index) in projects" :key="project.id" class="project-card" tabindex="0">
          <div class="project-image" :style="{ background: projectImages[index] }">
            <div class="project-overlay">
              <button class="btn btn-primary">{{ t('projects.viewProject') }}</button>
            </div>
            <span class="project-category">{{ project.category }}</span>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2xl); flex-wrap: wrap; gap: var(--space-md); }
.view-all-link { display: flex; align-items: center; gap: var(--space-sm); font-weight: 600; color: var(--color-cta); transition: gap var(--transition-base); cursor: pointer; }
.view-all-link:hover { gap: var(--space-md); }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: var(--space-xl); }
.project-card { background: var(--color-card-bg); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md); transition: all var(--transition-base); cursor: pointer; border: 1px solid var(--color-border); }
.project-card:hover { box-shadow: var(--shadow-xl); transform: translateY(-8px); }
.project-card:focus-visible { outline: 2px solid var(--color-cta); outline-offset: 2px; }

.project-image { position: relative; height: 200px; display: flex; align-items: center; justify-content: center; }
.project-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--transition-base); }
.project-card:hover .project-overlay { opacity: 1; }
.project-category { position: absolute; top: var(--space-md); left: var(--space-md); padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-xs); font-weight: 600; color: white; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); border-radius: var(--radius-sm); }

.project-content { padding: var(--space-lg); }
.project-title { font-size: var(--font-size-xl); margin-bottom: var(--space-sm); }
.project-description { font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-md); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.project-tech { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
.tech-tag { padding: var(--space-xs) var(--space-sm); font-size: var(--font-size-xs); font-weight: 500; color: var(--color-cta); background: rgba(37, 99, 235, 0.1); border-radius: var(--radius-sm); }

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; align-items: center; text-align: center; }
  .section-title::after { left: 50%; transform: translateX(-50%); }
}
</style>
