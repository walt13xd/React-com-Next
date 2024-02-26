import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const AppBar = () => {
    const { data: session } = useSession()

    return (
        <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5">
            <div className="ml-auto flex gap-2">
                {session?.user ? (
                    <AuthenticatedMenu session={session} />
                ) : (
                    <button className="text-green-600" onClick={() => signIn()}>
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}

const AuthenticatedMenu = ({ session }) => {
    return (
        <>
            <p className="text-sky-600">{session.user.email}</p>
            <button className="text-red-500" onClick={() => signOut()}>
                Sign Out
            </button>
        </>
    )
}

export default AppBar