import { createSchema, createYoga } from 'graphql-yoga'

import { createServer } from 'node:http'

const satellites = [
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
  {
    id: 'sat-003',
    name: 'LOFT-VECTOR-3',
    mission: 'On-Orbit AI',
    orbit: 'LEO',
    status: 'CRITICAL',
    batteryPercent: 22,
    temperatureC: 44,
    signalStrengthDb: -96,
    lastContactAt: '2026-06-03T16:25:00Z',
  },
]

const alerts = [
  {
    id: 'alert-001',
    satelliteId: 'sat-002',
    severity: 'WARNING',
    message: 'Signal strength below expected threshold during last contact.',
    createdAt: '2026-06-03T18:10:00Z',
  },
  {
    id: 'alert-002',
    satelliteId: 'sat-003',
    severity: 'CRITICAL',
    message: 'Battery level below operational safety margin.',
    createdAt: '2026-06-03T18:25:00Z',
  },
]

const contactWindows = [
  {
    id: 'contact-001',
    satelliteId: 'sat-001',
    groundStation: 'Golden, CO',
    startTime: '2026-06-03T22:15:00Z',
    endTime: '2026-06-03T22:27:00Z',
  },
  {
    id: 'contact-002',
    satelliteId: 'sat-002',
    groundStation: 'Toulouse, France',
    startTime: '2026-06-03T23:40:00Z',
    endTime: '2026-06-03T23:53:00Z',
  },
  {
    id: 'contact-003',
    satelliteId: 'sat-003',
    groundStation: 'San Francisco, CA',
    startTime: '2026-06-04T00:20:00Z',
    endTime: '2026-06-04T00:33:00Z',
  },
]

const typeDefs = /* GraphQL */ `
  enum SatelliteStatus {
    NOMINAL
    WARNING
    CRITICAL
  }

  enum OrbitType {
    LEO
    MEO
    GEO
  }

  enum AlertSeverity {
    INFO
    WARNING
    CRITICAL
  }

  type Satellite {
    id: ID!
    name: String!
    mission: String!
    orbit: OrbitType!
    status: SatelliteStatus!
    batteryPercent: Int!
    temperatureC: Int!
    signalStrengthDb: Int!
    lastContactAt: String!
  }

  type Alert {
    id: ID!
    satelliteId: ID!
    severity: AlertSeverity!
    message: String!
    createdAt: String!
  }

  type ContactWindow {
    id: ID!
    satelliteId: ID!
    groundStation: String!
    startTime: String!
    endTime: String!
  }

  type SatelliteDetail {
    satellite: Satellite!
    alerts: [Alert!]!
    contactWindows: [ContactWindow!]!
  }

  type Query {
    satellites: [Satellite!]!
    satelliteDetail(id: ID!): SatelliteDetail
  }
`

const resolvers = {
  Query: {
    satellites: () => satellites,
  },
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  cors: {
    origin: 'http://localhost:5173',
    credentials: false,
  },
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql')
})
