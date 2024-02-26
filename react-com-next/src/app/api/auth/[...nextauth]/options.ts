import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Digite o seu E-mail",
                },
                password: {
                    label: "Senha",
                    type: "password",
                    placeholder: "Digite sua Senha",
                },
            },
            async authorize(credentials, req) {

                try {
                    const response = await fetch(
                        "http://localhost:3003/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ 
                                email: credentials?.email,
                                senha: credentials?.password
                            })
                        }
                    );

                    const user = await response.json();
                    if (user) {
                        // Se a resposta for bem-sucedida, retornamos os dados do usuário
                        return user
                    } else {
                        // Se houver erro na resposta, lançamos um erro com a mensagem retornada pela API
                        throw new Error("Erro desconhecido: " + user.message)
                    }
                } catch (error) {
                    // Se houver algum erro na requisição, lançamos um erro
                    throw new Error("Erro ao fazer login: " + error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session({session, token, user}){
            session.user = token as any
            return session
        },

    }
};