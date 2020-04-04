import MyAccount from '../components/auth/my-account';
import { withConfig } from '../components/app';

export default withConfig({hideUserInToolbar: true})(MyAccount);
