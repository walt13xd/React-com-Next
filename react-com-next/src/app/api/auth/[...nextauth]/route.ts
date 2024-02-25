import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                } 
            },
            async authorize(credentials, req) {
              const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password
                }),
              })

              const user = await response.json()

              if(user && response.ok){
                return user
              }

              return null
            },
        })
    ],
    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }