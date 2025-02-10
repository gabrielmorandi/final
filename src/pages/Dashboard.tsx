import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const [userData, setUserData] = useState<any>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://final-api.gabriel-morandi.workers.dev/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);
                } else {
                    const data = await response.json();
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUserData();
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <h1>Dashboard</h1>
            {userData ? (
                <div>
                    <p>
                        <strong>ID:</strong> {userData.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Nome:</strong> {userData.name}
                    </p>
                    <p>
                        <strong>Função:</strong> {userData.role}
                    </p>
                </div>
            ) : (
                <p>Dados do usuário não encontrados.</p>
            )}
        </main>
    );
}
