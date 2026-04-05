<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import portraitImage from '../assets/images/carly.png'

const { t, tm } = useI18n()

const skills = computed(() => [
    { name: t('about.skillNames.vue'), level: 95 },
    { name: t('about.skillNames.javascript'), level: 95 },
    { name: t('about.skillNames.vibe'), level: 85 },
    { name: t('about.skillNames.claude'), level: 80 },
    { name: t('about.skillNames.css'), level: 90 },
    { name: t('about.skillNames.nodejs'), level: 80 },
    { name: t('about.skillNames.java'), level: 70 },
])

const currentExperiences = computed(() => tm('about.experiences'))
</script>

<template>
  <div class="about-view">
    <div class="container">
      <header class="about-header">
        <h1 class="page-title">{{ t('about.title') }}</h1>
      </header>

      <div class="about-content">
        <section class="profile-section">
          <div class="profile-image-wrapper">
            <div class="profile-image">
              <img :src="portraitImage" alt="Carly Tang" class="profile-img" />
            </div>
            <div class="profile-decoration"></div>
          </div>
          <div class="profile-info">
            <span class="intro-badge">{{ t('about.intro') }}</span>
            <h2 class="profile-name">{{ t('hero.name') }}</h2>
            <p class="profile-description">{{ t('about.description') }}</p>
            <blockquote class="profile-philosophy">"{{ t('about.philosophy') }}"</blockquote>
          </div>
        </section>

        <section class="skills-section">
          <h3 class="section-heading">{{ t('about.skills') }}</h3>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percentage">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </section>

        <div class="info-grid">
          <section class="experience-section">
            <h3 class="section-heading">{{ t('about.experience') }}</h3>
            <div class="timeline">
              <div v-for="exp in currentExperiences" :key="exp.year" class="timeline-item">
                <span class="timeline-year">{{ exp.year }}</span>
                <div class="timeline-content">
                  <h4 class="timeline-role">{{ exp.role }}</h4>
                  <p class="timeline-company">{{ exp.company }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="education-section">
            <h3 class="section-heading">{{ t('about.education') }}</h3>
            <div class="education-card">
              <div class="education-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="education-info">
                <h4 class="education-degree">{{ t('about.degree') }}</h4>
                <p class="education-university">{{ t('about.university') }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view { padding: var(--space-2xl) 0 var(--space-4xl); }
.about-header { margin-bottom: var(--space-2xl); }
.page-title { font-size: var(--font-size-5xl); }
.about-content { max-width: 900px; margin: 0 auto; }

.profile-section { display: grid; grid-template-columns: minmax(200px, 280px) 1fr; gap: var(--space-2xl); margin-bottom: var(--space-4xl); align-items: start; }
.profile-image-wrapper { position: relative; }
.profile-image { width: 100%; aspect-ratio: 1; border-radius: var(--radius-2xl); overflow: hidden; position: relative; z-index: 1; }
.profile-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.profile-decoration { position: absolute; inset: 12px; border: 3px solid var(--color-cta); border-radius: var(--radius-2xl); transform: translate(12px, 12px); }

.profile-info { padding-top: var(--space-md); }
.intro-badge { display: inline-block; padding: var(--space-xs) var(--space-md); background: rgba(37, 99, 235, 0.1); color: var(--color-cta); font-size: var(--font-size-sm); font-weight: 600; border-radius: var(--radius-full); margin-bottom: var(--space-md); }
.profile-name { font-size: var(--font-size-3xl); margin-bottom: var(--space-md); }
.profile-description { color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-lg); }
.profile-philosophy { padding: var(--space-lg); background: var(--color-card-bg); border-left: 4px solid var(--color-cta); border-radius: var(--radius-lg); font-style: italic; color: var(--color-text-muted); }

.skills-section { margin-bottom: var(--space-3xl); }
.section-heading { font-size: var(--font-size-2xl); margin-bottom: var(--space-xl); position: relative; display: inline-block; }
.section-heading::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 40px; height: 3px; background: var(--color-cta); border-radius: var(--radius-full); }

.skills-grid { display: grid; gap: var(--space-lg); }
.skill-item { background: var(--color-card-bg); padding: var(--space-md); border-radius: var(--radius-lg); border: 1px solid var(--color-border); }
.skill-header { display: flex; justify-content: space-between; margin-bottom: var(--space-sm); }
.skill-name { font-weight: 600; }
.skill-percentage { color: var(--color-cta); font-weight: 600; }
.skill-bar { height: 8px; background: var(--color-background); border-radius: var(--radius-full); overflow: hidden; }
.skill-progress { height: 100%; background: linear-gradient(90deg, var(--color-cta) 0%, var(--color-accent) 100%); border-radius: var(--radius-full); transition: width 1s ease; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl); }
.timeline { position: relative; padding-left: var(--space-lg); }
.timeline::before { content: ''; position: absolute; left: 4px; top: 8px; bottom: 8px; width: 2px; background: var(--color-border); }
.timeline-item { position: relative; padding-bottom: var(--space-lg); }
.timeline-item::before { content: ''; position: absolute; left: calc(-1 * var(--space-lg) + 1px); top: 6px; width: 10px; height: 10px; background: var(--color-cta); border-radius: var(--radius-full); }
.timeline-year { display: block; font-size: var(--font-size-sm); color: var(--color-cta); font-weight: 600; margin-bottom: var(--space-xs); }
.timeline-role { font-size: var(--font-size-base); margin-bottom: var(--space-xs); }
.timeline-company { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.education-card { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-lg); background: var(--color-card-bg); border-radius: var(--radius-xl); border: 1px solid var(--color-border); }
.education-icon { width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: rgba(37, 99, 235, 0.1); border-radius: var(--radius-lg); color: var(--color-cta); }
.education-degree { font-size: var(--font-size-base); margin-bottom: var(--space-xs); }
.education-university { font-size: var(--font-size-sm); color: var(--color-text-muted); }

@media (max-width: 768px) { .profile-section { grid-template-columns: 1fr; text-align: center; } .profile-image-wrapper { max-width: 240px; margin: 0 auto; } .profile-philosophy { text-align: left; } .info-grid { grid-template-columns: 1fr; } .page-title { font-size: var(--font-size-3xl); } }
</style>
