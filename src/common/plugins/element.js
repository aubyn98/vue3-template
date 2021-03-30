import { ElButton } from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'
export default function (app) {
  app.config.globalProperties.$ELEMENT = { size: 'small' }
  app.use(ElButton)
}
