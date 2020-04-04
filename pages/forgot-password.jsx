import ForgotPassword from '../components/auth/forgot-password';
import { withConfig } from '../components/app';

export default withConfig({hideUserInToolbar: true})(ForgotPassword);
