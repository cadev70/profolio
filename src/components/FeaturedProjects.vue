<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProjects } from '../composables/useProjects'
import ProjectCard from './ProjectCard.vue'

const { t } = useI18n()
const { projectData } = useProjects()

const projects = computed(() => projectData.value?.slice(0, 3) ?? [])
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
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2xl); flex-wrap: wrap; gap: var(--space-md); }
.view-all-link { display: flex; align-items: center; gap: var(--space-sm); font-weight: 600; color: var(--color-cta); transition: gap var(--transition-base); cursor: pointer; }
.view-all-link:hover { gap: var(--space-md); }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: var(--space-xl); }

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; align-items: center; text-align: center; }
  .section-title::after { left: 50%; transform: translateX(-50%); }
}
</style>
