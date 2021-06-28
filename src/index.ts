import VimeoBrowser from "./App";
import Vimeo from "./services/Vimeo";
import Sanity from "./services/Sanity"
import './styles/tailwind.css'

const setApiKey = Vimeo.setApiKey


export { setApiKey }

export default {
  name: 'vimeoBrowser',
  title: 'Vimeo Browser',
  component: VimeoBrowser,
}