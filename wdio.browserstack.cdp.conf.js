import { config as browserstackConfig } from './wdio.browserstack.conf.js'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { bootstrap } from 'global-agent'

const dispatcher = new ProxyAgent({
  uri: process.env.HTTP_PROXY
})
setGlobalDispatcher(dispatcher)
bootstrap()
global.GLOBAL_AGENT.HTTP_PROXY = process.env.HTTP_PROXY

export const config = browserstackConfig
