<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SatelliteTable from '../components/SatelliteTable.vue'
import { apolloClient } from '../graphql/apollo'
import { GET_SATELLITES } from '../graphql/queries'
import type { GetSatellitesResponse, Satellite, SatelliteStatus } from '../types/satellite'

const satellites = ref<Satellite[]>([])
const loading = ref(true)
const errorMessage = ref<string | null>(null)
const statusFilter = ref<'ALL' | SatelliteStatus>('ALL')

const filteredSatellites = computed(() => {
  if (statusFilter.value === 'ALL') return satellites.value
  return satellites.value.filter((satellite) => satellite.status === statusFilter.value)
})

const criticalCount = computed(
  () => satellites.value.filter((satellite) => satellite.status === 'CRITICAL').length,
)

const warningCount = computed(
  () => satellites.value.filter((satellite) => satellite.status === 'WARNING').length,
)

onMounted(async () => {
  try {
    const result = await apolloClient.query<GetSatellitesResponse>({
      query: GET_SATELLITES,
    })

    if (!result.data) {
      throw new Error('No satellite data returned from GraphQL API')
    }

    satellites.value = result.data.satellites
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load satellite data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="dashboard">
    <section class="hero">
      <p class="eyebrow">Satellite Operations</p>
      <h1>OrbitalOps Dashboard</h1>
      <p class="subtitle">
        Monitor simulated spacecraft health, alerts, and upcoming ground-station contacts.
      </p>
    </section>

    <section class="metrics">
      <article class="metric-card">
        <span>Total Satellites</span>
        <strong>{{ satellites.length }}</strong>
      </article>

      <article class="metric-card">
        <span>Warnings</span>
        <strong>{{ warningCount }}</strong>
      </article>

      <article class="metric-card">
        <span>Critical</span>
        <strong>{{ criticalCount }}</strong>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>Fleet Status</h2>

        <select v-model="statusFilter">
          <option value="ALL">All statuses</option>
          <option value="NOMINAL">Nominal</option>
          <option value="WARNING">Warning</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <p v-if="loading" class="state-message">Loading satellite data...</p>

      <p v-else-if="errorMessage" class="state-message error">
        {{ errorMessage }}
      </p>

      <SatelliteTable v-else :satellites="filteredSatellites" />
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 48px;
  background: #0f172a;
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

.hero {
  max-width: 900px;
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
  max-width: 680px;
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
  border: 1px solid #334155;
  border-radius: 16px;
  background: #111827;
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

.panel {
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #334155;
}

select {
  border: 1px solid #475569;
  border-radius: 8px;
  background: #020617;
  color: #e5e7eb;
  padding: 8px 12px;
}

.state-message {
  padding: 20px;
  color: #cbd5e1;
}

.state-message.error {
  color: #fecaca;
}
</style>
