import { createApp } from 'vue'
import type { ElMessage } from 'element-plus'
import { Storage } from '../utils/storage'
import addEventListener from '../utils/addEventListener'
import compose from '../utils/compose'
import log from '../utils/compose'
import debounce from '../utils/debounce'
import throttle from '../utils/throttle'
import Str from '../utils/str'
import { request } from '../utils/http'
interface Api {
  [index: string]: (
    params: any
  ) => Promise<{
    data: any
    message: string
    responseCode: string
    status: boolean
  }>
}

interface Utils {
  str:Str
  compose: typeof compose
  log: typeof log
  debounce: typeof debounce
  throttle: typeof throttle
  addEventListener: typeof addEventListener
  storage: Storage
  http: typeof request
}

interface Info {
  (parmas: { duration?: number; type: 'success' | 'error'; message: string; closed(): void }): Promise<any>
  success(params: string | { duration?: number; message: string; closed(): void }): Promise<any>
  error(params: string | { duration?: number; message: string; closed(): void }): Promise<any>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: () => {}
    $message: typeof ElMessage
  }
}
