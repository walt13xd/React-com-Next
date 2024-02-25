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
            async authorize(credentials) {
                const email = credentials?.email;
                const senha = credentials?.password; // Corrigindo para acessar o campo de senha

                try {
                    const response = await fetch(
                        `http://localhost:3003/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, senha })
                        }
                    );

                    const data = await response.json();
                    if (response.ok) {
                        // Se a resposta for bem-sucedida, retornamos os dados do usuário
                        return Promise.resolve(data);
                    } else {
                        // Se houver erro na resposta, lançamos um erro com a mensagem retornada pela API
                        throw new Error(data.message || "Erro desconhecido");
                    }
                } catch (error) {
                    // Se houver algum erro na requisição, lançamos um erro
                    throw new Error("Erro ao fazer login: " + error)
                }
            }
        })
    ]
};