import Link from "next/link";
import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">Fire Base Blog</button>
                    </Link>
                </li>

                { username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL}/>
                            </Link>
                        </li>
                    </>
                )}

                { !username && (
                    <li>
                        <Link href="/enter">
                        <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}