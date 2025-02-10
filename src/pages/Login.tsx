import { useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

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
                        <form className="flex flex-col gap-2">
                            <label htmlFor="loginemail">Email</label>
                            <input
                                id="loginemail"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="email"
                                placeholder="seuemail@clinica.com"
                            />
                            <label htmlFor="loginpassword">Senha</label>
                            <input
                                id="loginpassword"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                            />
                            <button
                                className="flex w-full bg-zinc-900 text-white px-4 py-2 mt-4 justify-center cursor-pointer"
                                type="submit"
                            >
                                Entrar
                            </button>
                        </form>
                    ) : (
                        <form className="flex flex-col gap-2">
                            <label htmlFor="cadastronomeclinica">Nome da Clínica/Hospital</label>
                            <input
                                id="cadastronomeclinica"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="Nome da sua clínica"
                            />
                            <label htmlFor="cadastronome">Seu Nome</label>
                            <input
                                id="cadastronome"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="Seu nome completo"
                            />
                            <label htmlFor="cadastroemail">Seu Email</label>
                            <input
                                id="cadastroemail"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="email"
                                placeholder="Seu email@clinica.com"
                            />
                            <label htmlFor="cadastrotelefone">Seu Telefone</label>
                            <input
                                id="cadastrotelefone"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="text"
                                placeholder="+55 (00) 9 0000-0000"
                            />
                            <label htmlFor="cadastrosenha">Senha</label>
                            <input
                                id="cadastrosenha"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                            />
                            <label htmlFor="cadastroconfirmasenha">Confirmar Senha</label>
                            <input
                                id="cadastroconfirmasenha"
                                className="flex w-full border border-zinc-900 px-4 py-2"
                                type="password"
                            />
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
