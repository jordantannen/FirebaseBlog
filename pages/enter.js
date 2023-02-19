import { auth, googleAuthProvider } from "../lib/firebase"

export default function EnterPage(props) {
    const user = null
    const username = null

    return (
        <main>
            {/* If user signed out, show sign in button,  signed out, show signout button,
            signed in but no user name, requests the username form */}
            {user ? !username ? <UsernameForm/> : <SignOutButton/> : <SignInButton/> }
        </main>
    )

    function SignInButton() {
        const signInWithGoogle = async () => {
            await auth.signInWithPopup(googleAuthProvider)
        }

        return (
            <button className="btn-google" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        )
    }

    function SignOutButton() {
        return <button onClick={() => auth.signOut()}>Sign Out</button>
    }

    function UsernameForm() {
        return null;
    }
}