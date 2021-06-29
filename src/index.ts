import VimeoBrowser from "./App";
import Vimeo from "./services/Vimeo";
import './styles/tailwind.css'
import Icon from './icon/Icon'
const setApiKey = Vimeo.setApiKey


export { setApiKey }

export default {
  name: 'vimeo',
  title: 'Vimeo',
  component: VimeoBrowser,
  icon: Icon
}