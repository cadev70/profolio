<script setup>
import HeroSection from '../components/HeroSection.vue'
import FeaturedProjects from '../components/FeaturedProjects.vue'
import AboutPreview from '../components/AboutPreview.vue'
import ContactCTA from '../components/ContactCTA.vue'
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <FeaturedProjects />
    <AboutPreview />
    <ContactCTA />
  </div>
</template>

<style scoped>
.home-view {
  overflow-x: hidden;
}
</style>
