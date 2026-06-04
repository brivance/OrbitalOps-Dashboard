<script setup lang="ts">
import type { Satellite } from '../types/satellite'
import { RouterLink } from 'vue-router'
defineProps<{
  satellites: Satellite[]
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Satellite</th>
        <th>Mission</th>
        <th>Orbit</th>
        <th>Status</th>
        <th>Battery</th>
        <th>Temp</th>
        <th>Signal</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="satellite in satellites" :key="satellite.id">
        <td>
          <RouterLink class="satellite-link" :to="`/satellites/${satellite.id}`">
            {{ satellite.name }}
          </RouterLink>
        </td>
        <td>{{ satellite.mission }}</td>
        <td>{{ satellite.orbit }}</td>
        <td>
          <span class="status" :class="satellite.status.toLowerCase()">
            {{ satellite.status }}
          </span>
        </td>
        <td>{{ satellite.batteryPercent }}%</td>
        <td>{{ satellite.temperatureC }}°C</td>
        <td>{{ satellite.signalStrengthDb }} dB</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 20px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  text-align: left;
}

th {
  color: #94a3b8;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status.nominal {
  background: #064e3b;
  color: #a7f3d0;
}

.status.warning {
  background: #78350f;
  color: #fde68a;
}

.status.critical {
  background: #7f1d1d;
  color: #fecaca;
}

.satellite-link {
  color: #bfdbfe;
  font-weight: 700;
  text-decoration: none;
}

.satellite-link:hover {
  text-decoration: underline;
}
</style>
