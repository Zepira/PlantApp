
import { signInWithEmailAndPassword } from 'firebase/auth';








export const Login = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);


