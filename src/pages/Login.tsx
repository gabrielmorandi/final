import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

    const [cadastroClinica, setCadastroClinica] = useState<string>("");
    const [cadastroNome, setCadastroNome] = useState<string>("");
    const [cadastroEmail, setCadastroEmail] = useState<string>("");
    const [cadastroTel, setCadastroTel] = useState<string>("");
    const [cadastroPassword, setCadastroPassword] = useState<string>("");
    const [cadastroPasswordConfirm, setCadastroPasswordConfirm] = useState<string>("");
    const [cadastroError, setCadastroError] = useState<string>("");

    const [redirect, setRedirect] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoginError("");

        try {
            if (!loginEmail) return setLoginError("Preencha o email");
            if (!loginPassword) return setLoginError("Preencha a senha");

            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.reload;
                localStorage.setItem("token", data.token);
                setRedirect(true);
            } else {
                setLoginError(data.error || "Erro desconhecido");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setLoginError("Erro interno ao tentar fazer login");
        }
    };

    const handlerSingup = async (e: React.FormEvent) => {
        e.preventDefault();

        setCadastroError("");

        try {
            if (!cadastroClinica) return setCadastroError("Preencha o nome da clinica");
            if (!cadastroNome) return setCadastroError("Preencha o nome");
            if (!cadastroEmail) return setCadastroError("Preencha o email");
            if (!cadastroTel) return setCadastroError("Preencha o telefone");
            if (!cadastroPassword) return setCadastroError("Preencha a senha");
            if (!cadastroPasswordConfirm) return setCadastroError("Confirme a senha");
            if (cadastroPassword != cadastroPasswordConfirm) return setCadastroError("Senhas diferentes");

            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    companyName: cadastroClinica,
                    adminName: cadastroNome,
                    email: cadastroEmail,
                    phone: cadastroTel,
                    password: cadastroPassword
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("ok");
                window.location.reload();
            } else {
                setCadastroError(data.error || "Erro desconhecido");
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            setCadastroError("Erro interno ao tentar fazer login");
        }
    };

    if (redirect) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <main className="grid place-items-center w-full h-dvh bg-zinc-100">
            <div className="flex flex-col w-11/12 max-w-[1280px] items-center">
                <div className="flex flex-col gap-4 max-w-[440px] w-full bg-white p-4 rounded-xs shadow">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-center">Bem-vindo</h2>
                        <h3 className="text-sm text-center text-zinc-500 text-balance">
                            Gerencie sua clínica de forma simples e eficiente
                        </h3>
                    </div>
                    <div className="flex border border-zinc-900">
                        <button
                            className="w-full flex px-4 py-2 justify-center cursor-pointer data-[state=selected]:bg-zinc-900 data-[state=selected]:text-white"
                            data-state={isLogin ? "selected" : "notSelected"}
                            onClick={() => {
                                setIsLogin(true);
                            }}
                        >
                            Login
                        </button>
                        <button
                            className="w-full flex px-4 py-2 justify-center cursor-pointer data-[state=notSelected]:bg-zinc-900 data-[state=notSelected]:text-white"
                            data-state={isLogin ? "selected" : "notSelected"}
                            onClick={() => {
                                setIsLogin(false);
                            }}
                        >
                            Cadastro
                        </button>
                    </div>

                    {isLogin ? (
                        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
                            <label htmlFor="loginemail">Email</label>
                            <input
                                id="loginemail"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="email"
                                placeholder="seuemail@clinica.com"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <label htmlFor="loginpassword">Senha</label>
                            <input
                                id="loginpassword"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                            <button
                                className="flex w-full bg-zinc-900 text-white px-4 py-2 mt-4 justify-center cursor-pointer"
                                type="submit"
                            >
                                Entrar
                            </button>
                        </form>
                    ) : (
                        <form className="flex flex-col gap-2" onSubmit={handlerSingup}>
                            <label htmlFor="cadastronomeclinica">Nome da Clínica/Hospital</label>
                            <input
                                id="cadastronomeclinica"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="Nome da sua clínica"
                                value={cadastroClinica}
                                onChange={(e) => setCadastroClinica(e.target.value)}
                            />
                            <label htmlFor="cadastronome">Seu Nome</label>
                            <input
                                id="cadastronome"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="Seu nome completo"
                                value={cadastroNome}
                                onChange={(e) => setCadastroNome(e.target.value)}
                            />
                            <label htmlFor="cadastroemail">Seu Email</label>
                            <input
                                id="cadastroemail"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="email"
                                placeholder="Seu email@clinica.com"
                                value={cadastroEmail}
                                onChange={(e) => setCadastroEmail(e.target.value)}
                            />
                            <label htmlFor="cadastrotelefone">Seu Telefone</label>
                            <input
                                id="cadastrotelefone"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="+55 (00) 9 0000-0000"
                                value={cadastroTel}
                                onChange={(e) => setCadastroTel(e.target.value)}
                            />
                            <label htmlFor="cadastrosenha">Senha</label>
                            <input
                                id="cadastrosenha"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                                value={cadastroPassword}
                                onChange={(e) => setCadastroPassword(e.target.value)}
                            />
                            <label htmlFor="cadastroconfirmasenha">Confirmar Senha</label>
                            <input
                                id="cadastroconfirmasenha"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                                value={cadastroPasswordConfirm}
                                onChange={(e) => setCadastroPasswordConfirm(e.target.value)}
                            />
                            {cadastroError && <p className="text-sm text-red-600">{cadastroError}</p>}
                            <button
                                className="flex w-full bg-zinc-900 text-white px-4 py-2 mt-4 justify-center cursor-pointer"
                                type="submit"
                            >
                                Cadastrar
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
