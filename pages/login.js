import Login from '../components/auth/login';
import { withConfig } from '../components/app';

export default withConfig({hideUserInToolbar: true})(Login);
