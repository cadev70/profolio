<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MatrixText from './MatrixText.vue'

const { t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <span class="hero-greeting animate-fade-in-up">{{ t('hero.greeting') }}</span>
        <h1 class="hero-name animate-fade-in-up stagger-1">
          {{ t('hero.name') }}
        </h1>
        <h2 class="hero-role animate-fade-in-up stagger-2">
          <MatrixText :from-text="t('hero.role')" :to-text="t('hero.roleTo')" />
        </h2>
        <p class="hero-description animate-fade-in-up stagger-3">
          {{ t('hero.description') }}
        </p>
        <div class="hero-cta animate-fade-in-up stagger-4">
          <RouterLink to="/projects" class="btn btn-primary">
            {{ t('hero.cta.projects') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-secondary">
            {{ t('hero.cta.contact') }}
          </RouterLink>
        </div>
      </div>

      <div class="hero-visual animate-fade-in stagger-2">
        <div class="code-window">
          <div class="code-header">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-title">developer.ts</span>
          </div>
          <div class="code-content">
            <pre><code><span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">"Carly Tang"</span>,
  <span class="property">skills</span>: [<span class="string">"Vue"</span>, <span class="string">"JavaScript"</span>, <span class="string">"Java"</span>],
  <span class="property">passion</span>: <span class="string">"Building beautiful Frontend Apps"</span>,
  <span class="property">available</span>: <span class="boolean">true</span>
};</code></pre>
          </div>
        </div>
        <div class="floating-badge badge-1 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>10+ Years</span>
        </div>
        <!-- <div class="floating-badge badge-2 animate-float" style="animation-delay: 0.5s;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>50+ Projects</span>
        </div> -->
      </div>
    </div>

    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: calc(100vh - 80px); display: flex; align-items: center; overflow: hidden; }

.hero-container { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3xl); align-items: center; position: relative; z-index: 1; padding: var(--space-3xl) var(--space-lg); }

.hero-content { max-width: 540px; }
.hero-greeting { display: block; font-size: var(--font-size-lg); color: var(--color-text-muted); margin-bottom: var(--space-sm); opacity: 0; }
.hero-name { font-size: var(--font-size-6xl); line-height: 1.1; margin-bottom: var(--space-sm); opacity: 0; }
.hero-role { font-size: var(--font-size-4xl); margin-bottom: var(--space-lg); opacity: 0; min-height: 2.4em; display: flex; align-items: flex-start; }
.hero-description { font-size: var(--font-size-lg); color: var(--color-text-muted); line-height: 1.7; margin-bottom: var(--space-xl); opacity: 0; }
.hero-cta { display: flex; gap: var(--space-md); opacity: 0; }

.hero-visual { position: relative; display: flex; justify-content: center; }
.code-window { background: var(--color-primary); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-xl); width: 100%; max-width: 440px; }
.code-header { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); background: rgba(0,0,0,0.2); }
.code-dot { width: 12px; height: 12px; border-radius: var(--radius-full); }
.code-dot.red { background: #FF5F56; }
.code-dot.yellow { background: #FFBD2E; }
.code-dot.green { background: #27CA40; }
.code-title { margin-left: var(--space-sm); font-size: var(--font-size-sm); color: rgba(255,255,255,0.5); }
.code-content { padding: var(--space-lg); font-family: 'SF Mono', 'Fira Code', monospace; font-size: var(--font-size-sm); line-height: 1.8; color: #E2E8F0; }
.code-content pre { margin: 0; }
.keyword { color: #C792EA; }
.variable { color: #82AAFF; }
.property { color: #F78C6C; }
.string { color: #C3E88D; }
.boolean { color: #89DDFF; }

.floating-badge { position: absolute; display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) var(--space-md); background: var(--color-card-bg); border-radius: var(--radius-full); box-shadow: var(--shadow-lg); font-size: var(--font-size-sm); font-weight: 600; color: var(--color-primary); }
.floating-badge svg { color: var(--color-cta); }
.badge-1 { top: 0; right: -20px; }
.badge-2 { bottom: 20px; left: -20px; }

.hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.hero-gradient { position: absolute; top: -50%; right: -20%; width: 80%; height: 80%; background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%); }
.hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.3; }

@media (max-width: 1024px) { .hero-container { grid-template-columns: 1fr; text-align: center; } .hero-content { max-width: 100%; } .hero-role { justify-content: center; } .hero-cta { justify-content: center; } .hero-visual { display: none; } }
@media (max-width: 768px) { .hero-name { font-size: var(--font-size-4xl); } .hero-role { font-size: var(--font-size-2xl); } .hero-cta { flex-direction: column; } .hero-cta .btn { width: 100%; justify-content: center; } }
</style>
