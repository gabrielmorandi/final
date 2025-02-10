import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
    return (
        <main className="grid place-items-center h-dvh">
            <div className="flex w-11/12 max-w-[1280px] justify-center py-4">
                <Link to={"/login"} className="flex gap-2  py-2 px-4 bg-zinc-900 text-white">
                    <span className="text-lg leading-[24px]">Cadastre-se</span>
                    <ArrowUpRight />
                </Link>
            </div>
        </main>
    );
}
