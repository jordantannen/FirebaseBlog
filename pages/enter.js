import { auth, googleAuthProvider } from "../lib/firebase"
import { useContext } from "react"
import { UserContext } from '../lib/context'

export default function EnterPage(props) {
    const { user, username } = useContext(UserContext)
    // const user = null;
    // const username = null;


    return (
        <main>
            {/* If user signed out, show sign in button,  signed out, show signin button,
            signed in but no user name, requests the username form */}
            {user ? 
                !username ? <UsernameForm /> : <SignOutButton /> 
                : 
                <SignInButton />
            }
            <h1>Enter</h1>
        </main>
    )

    function SignInButton() {
        const signInWithGoogle = async () => {
            await auth.signInWithPopup(googleAuthProvider)
            console.log("Sign in...")
        }

        return (
            <button className="btn-google" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        )
    }

    function SignOutButton() {
        return (
            <h1>test</h1>,
            <button onClick={() => auth.signOut()}>
                Sign Out
            </button>
            )
    }

    function UsernameForm() {
        return (
            <h1>form</h1>
        );
    }
}