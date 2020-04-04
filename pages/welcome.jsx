import Welcome from '../components/auth/welcome';
import { withConfig } from '../components/app';

export default withConfig({hideUserInToolbar: true})(Welcome);
