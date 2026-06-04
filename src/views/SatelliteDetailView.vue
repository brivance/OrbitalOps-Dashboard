<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { apolloClient } from '../graphql/apollo'
import { GET_SATELLITE_DETAIL } from '../graphql/queries'
import type {
  GetSatelliteDetailResponse,
  GetSatelliteDetailVariables,
  SatelliteDetail,
} from '../types/satellite'

const route = useRoute()

const detail = ref<SatelliteDetail | null>(null)
const loading = ref(true)
const errorMessage = ref<string | null>(null)

const satelliteId = computed(() => String(route.params.id))

onMounted(async () => {
  try {
    const result = await apolloClient.query<
      GetSatelliteDetailResponse,
      GetSatelliteDetailVariables
    >({
      query: GET_SATELLITE_DETAIL,
      variables: {
        id: satelliteId.value,
      },
    })

    if (!result.data) {
      throw new Error('No satellite detail returned from GraphQL API')
    }

    detail.value = result.data.satelliteDetail
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load satellite detail'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="detail-page">
    <RouterLink class="back-link" to="/">← Back to dashboard</RouterLink>

    <p v-if="loading" class="state-message">Loading satellite detail...</p>

    <p v-else-if="errorMessage" class="state-message error">
      {{ errorMessage }}
    </p>

    <section v-else-if="detail" class="content">
      <header class="hero">
        <p class="eyebrow">Satellite Detail</p>
        <h1>{{ detail.satellite.name }}</h1>
        <p class="subtitle">
          {{ detail.satellite.mission }} · {{ detail.satellite.orbit }} ·
          {{ detail.satellite.status }}
        </p>
      </header>

      <section class="metrics">
        <article class="metric-card">
          <span>Battery</span>
          <strong>{{ detail.satellite.batteryPercent }}%</strong>
        </article>

        <article class="metric-card">
          <span>Temperature</span>
          <strong>{{ detail.satellite.temperatureC }}°C</strong>
        </article>

        <article class="metric-card">
          <span>Signal</span>
          <strong>{{ detail.satellite.signalStrengthDb }} dB</strong>
        </article>
      </section>

      <section class="grid">
        <article class="panel">
          <h2>Alerts</h2>

          <p v-if="detail.alerts.length === 0" class="empty">No active alerts.</p>

          <ul v-else class="list">
            <li v-for="alert in detail.alerts" :key="alert.id">
              <strong>{{ alert.severity }}</strong>
              <span>{{ alert.message }}</span>
            </li>
          </ul>
        </article>

        <article class="panel">
          <h2>Contact Windows</h2>

          <ul class="list">
            <li v-for="window in detail.contactWindows" :key="window.id">
              <strong>{{ window.groundStation }}</strong>
              <span>{{ window.startTime }} → {{ window.endTime }}</span>
            </li>
          </ul>
        </article>
      </section>
    </section>

    <p v-else class="state-message error">Satellite not found.</p>
  </main>
</template>

<style scoped>
.detail-page {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding: 48px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 24%, rgba(56, 189, 248, 0.2), transparent 28%),
    radial-gradient(circle at 78% 8%, rgba(217, 70, 239, 0.16), transparent 26%),
    linear-gradient(135deg, #030712 0%, #10172a 48%, #111827 100%);
  color: #e5e7eb;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.detail-page::before,
.detail-page::after {
  position: fixed;
  inset: 0;
  z-index: -1;
  content: '';
  pointer-events: none;
}

.detail-page::before {
  opacity: 0.74;
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.9) 0 1px, transparent 1px),
    radial-gradient(circle, rgba(125, 211, 252, 0.75) 0 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, 0.55) 0 1px, transparent 1px);
  background-position:
    0 0,
    24px 36px,
    72px 18px;
  background-size:
    92px 92px,
    138px 138px,
    176px 176px;
}

.detail-page::after {
  background:
    linear-gradient(115deg, transparent 0 48%, rgba(148, 163, 184, 0.14) 48.2% 48.6%, transparent 49%),
    linear-gradient(150deg, transparent 0 62%, rgba(45, 212, 191, 0.12) 62.1% 62.5%, transparent 63%),
    linear-gradient(to bottom, rgba(3, 7, 18, 0.18), rgba(3, 7, 18, 0.76));
}

.back-link {
  display: inline-block;
  margin-bottom: 32px;
  color: #bfdbfe;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.hero {
  margin-bottom: 32px;
}

.eyebrow {
  color: #93c5fd;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-size: 3rem;
  line-height: 1.1;
}

.subtitle {
  color: #cbd5e1;
  font-size: 1.1rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.metric-card,
.panel {
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.76);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(14px);
}

.metric-card {
  padding: 20px;
}

.metric-card span {
  display: block;
  color: #94a3b8;
  font-size: 0.9rem;
}

.metric-card strong {
  display: block;
  margin-top: 8px;
  font-size: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.panel {
  padding: 20px;
}

.list {
  display: grid;
  gap: 12px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.list li {
  display: grid;
  gap: 4px;
  border-top: 1px solid rgba(148, 163, 184, 0.22);
  padding-top: 12px;
}

.list strong {
  color: #bfdbfe;
}

.list span,
.empty {
  color: #cbd5e1;
}

.state-message {
  padding: 20px;
  color: #cbd5e1;
}

.state-message.error {
  color: #fecaca;
}
</style>
