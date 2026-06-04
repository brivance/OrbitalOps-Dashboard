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
