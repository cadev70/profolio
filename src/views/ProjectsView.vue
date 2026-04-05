<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjects } from '../composables/useProjects'

const { t, locale } = useI18n()
const { projectData } = useProjects()

const categories = ['All', 'Web App', 'Dashboard', 'Mobile App', 'UI Library', 'Game', 'CLI Tool']
const zhCategories = {
  'All': '全部',
  'Web App': '網頁應用',
  'Dashboard': '儀表板',
  'Mobile App': '行動應用',
  'UI Library': 'UI 元件庫',
  'Game': '遊戲',
  'CLI Tool': '命令列工具'
}

const selectedCategory = ref('All')

const projects = computed(() => projectData.value?.[locale.value] ?? [])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(p => {
    const zhToEn = {
      '網頁應用': 'Web App',
      '儀表板': 'Dashboard',
      '行動應用': 'Mobile App',
      'UI 元件庫': 'UI Library',
      '遊戲': 'Game',
      '命令列工具': 'CLI Tool'
    }
    const normalizedCat = zhToEn[p.category] || p.category
    return normalizedCat === selectedCategory.value
  })
})

const getCategoryLabel = (cat) => {
  return locale.value === 'zh' ? zhCategories[cat] || cat : cat
}

const projectImages = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
]
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
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image" :style="{ background: projectImages[index % projectImages.length] }">
              <div class="project-overlay">
                <div class="project-actions">
                  <button class="btn btn-primary action-btn">
                    {{ t('projects.viewProject') }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </button>
                  <button class="btn btn-secondary action-btn">
                    {{ t('projects.viewCode') }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </button>
                </div>
              </div>
              <span class="project-category-badge">{{ project.category }}</span>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-technologies">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
          </article>
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
.project-card { background: var(--color-card-bg); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md); transition: all var(--transition-base); cursor: pointer; border: 1px solid var(--color-border); }
.project-card:hover { box-shadow: var(--shadow-xl); transform: translateY(-8px); }

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

.projects-enter-active, .projects-leave-active { transition: all 0.4s ease; }
.projects-enter-from, .projects-leave-to { opacity: 0; transform: translateY(20px); }
.projects-move { transition: transform 0.4s ease; }

@media (max-width: 768px) { .page-title { font-size: var(--font-size-3xl); } .projects-grid { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .filter-bar { gap: var(--space-xs); } .filter-btn { padding: var(--space-xs) var(--space-md); font-size: var(--font-size-xs); } }
</style>
