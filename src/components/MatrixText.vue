<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  fromText: { type: String, required: true },
  toText:   { type: String, required: true }
})

const CHARS_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!<>{}[]|~^'
const CHARS_ZH = '的一是在不了有和人這中大為上個國我以要他時來用們生到作地於出就分對成會可主發年動同工也能下過子說產種面而方後多定行學法所民得經十三之進著等部度家電力裡如水化高自二理起小物現實加量都兩體制機當使點從業本去把性好應開合還因由其些然前外天政四日那社義事平形相全表間樣與關各重新線內數正心反明看原又麼利比或但質氣第向道命此變條只沒結解問意建月公無系軍很情者最立代想已通並提直題程展'

const SCRAMBLE_DURATION  = 2500
const SCRAMBLE_INTERVAL  = 50   // ms between random-char refreshes (slower flip)
const PAUSE_TO   = 2000
const PAUSE_FROM = 1500

function getRandomChar(isZh) {
  const pool = isZh ? CHARS_ZH : CHARS_EN
  return pool[Math.floor(Math.random() * pool.length)]
}

// Each element: { value: string, locked: boolean }
const chars = ref([])
let rafId     = null
let timeoutId = null
let running   = false

function buildLocked(text) {
  return text.split('').map(c => ({ value: c, locked: true }))
}

function runScramble(to, onDone) {
  const isZh = /[\u4e00-\u9fff]/.test(to)
  const startTime = performance.now()
  let lastScrambleUpdate = 0

  // All chars scramble freely for startOffset ms, then lock in left-to-right
  const startOffset = SCRAMBLE_DURATION * 0.15
  const lockTimes = to.split('').map((c, i) => {
    if (c === ' ') return 0
    const base   = startOffset + (i / to.length) * SCRAMBLE_DURATION * 0.4
    const jitter = Math.random() * (SCRAMBLE_DURATION * 0.04)
    return base + jitter
  })

  // Immediately fill with scrambled chars at target length
  chars.value = to.split('').map(c => ({
    value:  c === ' ' ? ' ' : getRandomChar(isZh),
    locked: c === ' '
  }))

  function frame(now) {
    if (!running) return
    const elapsed        = now - startTime
    const shouldFlip     = now - lastScrambleUpdate >= SCRAMBLE_INTERVAL
    const prev           = chars.value

    chars.value = to.split('').map((c, i) => {
      if (c === ' ') return { value: ' ', locked: true }
      if (elapsed >= lockTimes[i]) return { value: c, locked: true }
      // Only generate a new random char at the throttled interval
      if (shouldFlip || !prev[i]) return { value: getRandomChar(isZh), locked: false }
      return prev[i]
    })

    if (shouldFlip) lastScrambleUpdate = now

    if (elapsed < SCRAMBLE_DURATION) {
      rafId = requestAnimationFrame(frame)
    } else {
      chars.value = buildLocked(to)
      onDone()
    }
  }

  rafId = requestAnimationFrame(frame)
}

function loop() {
  if (!running) return
  runScramble(props.toText, () => {
    if (!running) return
    timeoutId = setTimeout(() => {
      if (!running) return
      runScramble(props.fromText, () => {
        if (!running) return
        timeoutId = setTimeout(() => {
          if (running) loop()
        }, PAUSE_FROM)
      })
    }, PAUSE_TO)
  })
}

function stopAll() {
  running = false
  if (rafId)     { cancelAnimationFrame(rafId); rafId = null }
  if (timeoutId) { clearTimeout(timeoutId);     timeoutId = null }
}

function startAll() {
  stopAll()
  chars.value = buildLocked(props.fromText)
  running = true
  // Small delay so the initial fade-in animation finishes first
  timeoutId = setTimeout(() => { if (running) loop() }, 900)
}

onMounted(startAll)
onUnmounted(stopAll)
watch([() => props.fromText, () => props.toText], startAll)
</script>

<template>
  <span class="matrix-text" aria-live="off" aria-label="Job title animation">
    <span
      v-for="(char, i) in chars"
      :key="i"
      :class="char.locked ? 'char-locked' : 'char-scrambling'"
    >{{ char.value }}</span>
  </span>
</template>

<style scoped>
.matrix-text {
  display: inline;
}

@media (min-width: 1025px) {
  .matrix-text { white-space: nowrap; }
}

/* Locked characters use the same blue→purple gradient as .text-gradient */
.char-locked {
  background: linear-gradient(135deg, var(--color-cta) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scrambling characters — midpoint indigo between --color-cta and --color-accent */
.char-scrambling {
  -webkit-text-fill-color: var(--color-accent-mid);
  text-shadow: 0 0 8px var(--color-accent-mid);
}
</style>
