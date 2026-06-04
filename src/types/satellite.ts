export type SatelliteStatus = 'NOMINAL' | 'WARNING' | 'CRITICAL'

export type OrbitType = 'LEO' | 'MEO' | 'GEO'

export type Satellite = {
  id: string
  name: string
  mission: string
  orbit: OrbitType
  status: SatelliteStatus
  batteryPercent: number
  temperatureC: number
  signalStrengthDb: number
  lastContactAt: string
}

export type GetSatellitesResponse = {
  satellites: Satellite[]
}
