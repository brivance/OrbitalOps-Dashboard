import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, expect, it } from 'vitest'

import type { Satellite } from '../../types/satellite'
import SatelliteTable from '../SatelliteTable.vue'

const satellites: Satellite[] = [
  {
    id: 'sat-001',
    name: 'LOFT-AURORA-1',
    mission: 'Earth Observation',
    orbit: 'LEO',
    status: 'NOMINAL',
    batteryPercent: 87,
    temperatureC: 22,
    signalStrengthDb: -71,
    lastContactAt: '2026-06-03T18:42:00Z',
  },
  {
    id: 'sat-002',
    name: 'LOFT-PIONEER-2',
    mission: 'IoT Connectivity',
    orbit: 'LEO',
    status: 'WARNING',
    batteryPercent: 54,
    temperatureC: 31,
    signalStrengthDb: -84,
    lastContactAt: '2026-06-03T17:10:00Z',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/satellites/:id',
      name: 'satellite-detail',
      component: { template: '<div>Satellite Detail</div>' },
    },
  ],
})

describe('SatelliteTable', () => {
  it('renders satellite rows', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(SatelliteTable, {
      props: {
        satellites,
      },
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('LOFT-AURORA-1')
    expect(wrapper.text()).toContain('LOFT-PIONEER-2')
    expect(wrapper.text()).toContain('Earth Observation')
    expect(wrapper.text()).toContain('IoT Connectivity')
  })

  it('links each satellite to its detail route', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(SatelliteTable, {
      props: {
        satellites,
      },
      global: {
        plugins: [router],
      },
    })

    const links = wrapper.findAll('a')

    expect(links.map((link) => link.attributes('href'))).toEqual([
      '/satellites/sat-001',
      '/satellites/sat-002',
    ])
  })
})
