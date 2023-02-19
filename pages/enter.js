import { auth, googleAuthProvider, firestore } from "../lib/firebase"
import { useContext, useEffect, useState, useCallback } from "react"
import { UserContext } from '../lib/context'
import debounce from 'lodash.debounce';


export default function EnterPage(props) {
    const { user, username } = useContext(UserContext)
    // const user = null;
    // const username = null;

    const onSubmit = async (e) => {
        e.preventDefault();
    
        // Create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);
    
        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(usernameDoc, { uid: user.uid });
    
        await batch.commit();
      };

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
            <h1>SoutButton</h1>,
            <button onClick={() => auth.signOut()}>
                Sign Out
            </button>
            )
    }

    function UsernameForm() {
        const [formValue, setFormValue] = useState('')
        const [isValid, setIsValid] = useState(false)
        const [loading, setLoading] = useState(false)

        const {user, username} = useContext(UserContext)

        const onChange = (e) => {
            const val = e.target.value.toLowerCase();
            const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

            if (val.length < 3) {
                setFormValue(val);
                setLoading(false);
                setIsValid(false);
            }

            if (re.test(val)) {
                setFormValue(val)
                setLoading(true)
                setIsValid(false)
            }
        }

        useEffect(() => {checkUsername(formValue), [formValue]})

        const checkUsername = useCallback(
            debounce(async (username) => {
              if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
              }
            }, 500),
            []
          );

        return (
            !username && (
                <section>
                    <h3>Select Username</h3>
                    <form onSubmit={onSubmit}>
                        <input name="username" placeholder="username" value={formValue} onChange={onChange}/>
                        <button type="summit" className="btn-green" disabled={!isValid}>
                            Submit
                        </button>
                    </form>
                </section>
            )
        );
    }
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
}