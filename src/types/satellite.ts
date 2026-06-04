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

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL'

export type Alert = {
  id: string
  satelliteId: string
  severity: AlertSeverity
  message: string
  createdAt: string
}

export type ContactWindow = {
  id: string
  satelliteId: string
  groundStation: string
  startTime: string
  endTime: string
}

export type SatelliteDetail = {
  satellite: Satellite
  alerts: Alert[]
  contactWindows: ContactWindow[]
}

export type GetSatelliteDetailResponse = {
  satelliteDetail: SatelliteDetail | null
}

export type GetSatelliteDetailVariables = {
  id: string
}
