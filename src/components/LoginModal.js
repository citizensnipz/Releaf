import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import UserContext from '../store/user-context';


const LoginModal = (props) => {

	const ctx = useContext(UserContext);


	return (
		<Dialog open={ctx.drawerOpen} onClose={ctx.onClose}>
	        <DialogTitle>Subscribe</DialogTitle>
	        <DialogContent>
	          <DialogContentText>
	            Login here!
	          </DialogContentText>
	          <TextField
	            autoFocus
	            margin="dense"
	            id="name"
	            label="Email Address"
	            type="email"
	            fullWidth
	            variant="standard"
	          />
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={ctx.onClose}>Cancel</Button>
	          <Button onClick={ctx.onClose}>Subscribe</Button>
	        </DialogActions>
      	</Dialog>

		)

}

export default LoginModal;