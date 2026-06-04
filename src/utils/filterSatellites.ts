import type { Satellite, SatelliteStatus } from '../types/satellite'

export function filterSatellitesByStatus(
  satellites: Satellite[],
  statusFilter: 'ALL' | SatelliteStatus,
): Satellite[] {
  if (statusFilter === 'ALL') {
    return satellites
  }

  return satellites.filter((satellite) => satellite.status === statusFilter)
}
