import {
  initializeDevCycle,
  DevCycleClient,
  DevCycleCloudClient,
} from "@devcycle/nodejs-server-sdk"

const DEVCYCLE_SERVER_SDK_KEY = process.env.DEVCYCLE_SERVER_SDK_KEY as string

let devcycleCloudClient: DevCycleCloudClient
async function initializeDevCycleClient() {
  devcycleCloudClient = initializeDevCycle(DEVCYCLE_SERVER_SDK_KEY, {
    logLevel: "warn",
    enableCloudBucketing: true,
    // Controls the polling interval in milliseconds to fetch new environment config changes
    configPollingIntervalMS: 5 * 1000,
    // Controls the interval between flushing events to the DevCycle servers
    eventFlushIntervalMS: 10000,

    // eventsAPIURI: "http://localhost:4032",
    // configCDNURI: "https://local-config-cdn.devcycle.com",
  })
  // return devcycleClient
}

function getDevCycleCloudClient() {
  return devcycleCloudClient
}

export { initializeDevCycleClient, getDevCycleCloudClient }
