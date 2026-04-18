<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjects } from '../composables/useProjects'
import ProjectCard from '../components/ProjectCard.vue'

const { t } = useI18n()
const { projectData } = useProjects()

const categories = ['all', 'webapp', 'dashboard', 'mobileApp', 'uiLib', 'game', 'cliTool']

const selectedCategory = ref('all')

const projects = computed(() => projectData.value ?? [])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects.value
  return projects.value.filter(p => p.category === selectedCategory.value)
})

const getCategoryLabel = (cat) => t(`projects.categories.${cat}`)
</script>

<template>
  <div class="projects-view">
    <div class="container">
      <header class="projects-header">
        <h1 class="page-title">{{ t('projects.title') }}</h1>
        <p class="page-subtitle">{{ t('projects.subtitle') }}</p>
      </header>

      <div class="filter-bar">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>

      <div class="projects-grid">
        <TransitionGroup name="projects">
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :project="project"
            :index="index"
            :show-code-btn="true"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-view { padding: var(--space-2xl) 0 var(--space-4xl); }
.projects-header { text-align: center; margin-bottom: var(--space-2xl); }
.page-title { font-size: var(--font-size-5xl); margin-bottom: var(--space-md); }
.page-subtitle { font-size: var(--font-size-lg); color: var(--color-text-muted); }

.filter-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-sm); margin-bottom: var(--space-2xl); }
.filter-btn { padding: var(--space-sm) var(--space-lg); font-family: var(--font-heading); font-weight: 500; font-size: var(--font-size-sm); color: var(--color-text-muted); background: var(--color-card-bg); border: 2px solid var(--color-border); border-radius: var(--radius-full); cursor: pointer; transition: all var(--transition-base); }
.filter-btn:hover { border-color: var(--color-cta); color: var(--color-cta); }
.filter-btn.active { background: var(--color-cta); border-color: var(--color-cta); color: white; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: var(--space-xl); }

.projects-enter-active { transition: all 0.4s ease 0.5s; }
.projects-leave-active { transition: all 0.4s ease; }
.projects-enter-from, .projects-leave-to { opacity: 0; transform: translateY(20px); }
.projects-move { transition: transform 0.4s ease; }

@media (max-width: 768px) { .page-title { font-size: var(--font-size-3xl); } .projects-grid { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .filter-bar { gap: var(--space-xs); } .filter-btn { padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); } }
</style>
