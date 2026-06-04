import { describe, expect, it } from 'vitest'

import type { Satellite } from '../../types/satellite'
import { filterSatellitesByStatus } from '../filterSatellites'

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

describe('filterSatellitesByStatus', () => {
  it('returns all satellites when status filter is ALL', () => {
    expect(filterSatellitesByStatus(satellites, 'ALL')).toEqual(satellites)
  })

  it('returns only satellites with the selected status', () => {
    expect(filterSatellitesByStatus(satellites, 'WARNING')).toEqual([satellites[1]])
  })
})
