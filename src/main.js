import './styles/base.css'
import './styles/stage.css'
import './styles/scenes.css'
import { chapters } from './content.js'
import { renderStage } from './stage.js'
import { initMotion } from './motion.js'

const root = document.querySelector('#app')
renderStage(root, chapters)
document.documentElement.classList.add('js')

let cleanupMotion = null
initMotion(document, chapters).then((cleanup) => {
  cleanupMotion = cleanup
})

if (import.meta.hot) {
  import.meta.hot.dispose(() => cleanupMotion?.())
}
