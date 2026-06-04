import { gql } from '@apollo/client/core'

export const GET_SATELLITES = gql`
  query GetSatellites {
    satellites {
      id
      name
      mission
      orbit
      status
      batteryPercent
      temperatureC
      signalStrengthDb
      lastContactAt
    }
  }
`
export const GET_SATELLITE_DETAIL = gql`
  query GetSatelliteDetail($id: ID!) {
    satelliteDetail(id: $id) {
      satellite {
        id
        name
        mission
        orbit
        status
        batteryPercent
        temperatureC
        signalStrengthDb
        lastContactAt
      }
      alerts {
        id
        satelliteId
        severity
        message
        createdAt
      }
      contactWindows {
        id
        satelliteId
        groundStation
        startTime
        endTime
      }
    }
  }
`
