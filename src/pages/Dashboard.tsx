import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("conta");
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [doctorsData, setDoctorsData] = useState<any>(null);
    const [customerData, setCustomerData] = useState<any>(null);

    const [doctorName, setDoctorName] = useState("");
    const [doctorEmail, setDoctorEmail] = useState("");
    const [doctorPassword, setDoctorPassword] = useState("");
    const [doctorSpe, setDoctorSpe] = useState<number>(1);
    const [doctorCrm, setDoctorCrm] = useState("");

    const token = localStorage.getItem("token");

    const fetchCustomers = async () => {
        try {
            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/customers", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar os clientes");
            }

            const data = await response.json();
            setCustomerData(data);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/doctors", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar os médicos");
            }

            const data = await response.json();
            setDoctorsData(data);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data.user);
            } else {
                console.error("Erro ao buscar dados do usuário:", await response.text());
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchCustomers();
        fetchDoctors();
    }, [token]);

    const createDoctor = async () => {
        try {
            const response = await fetch("https://final-api.gabriel-morandi.workers.dev/doctors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: doctorEmail,
                    password: doctorPassword,
                    name: doctorName,
                    customer_id: userData?.customerId,
                    crm: doctorCrm,
                    specialty_id: doctorSpe
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o médico");
            }

            const data = await response.json();
            console.log("Médico criado com sucesso:", data);

            // Resetando os campos após a criação
            setDoctorEmail("");
            setDoctorPassword("");
            setDoctorName("");
            setDoctorCrm("");
            setDoctorSpe(1);
            setShowModal(false);
            fetchDoctors();
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    if (!token) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen bg-zinc-100">
            <nav className="bg-white shadow-sm w-64 fixed left-0 top-0 bottom-0 p-4">
                <h1 className="text-xl font-bold mb-6">SaaS Médico</h1>
                <ul className="space-y-2">
                    {["conta", "médicos", "pacientes", "agendamentos", "horários"].map((section) => (
                        <li key={section}>
                            <button
                                onClick={() => setActiveSection(section)}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    activeSection === section
                                        ? "bg-zinc-950 text-white"
                                        : "hover:bg-zinc-100 cursor-pointer"
                                }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="ml-64 p-8">
                {activeSection === "conta" && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold capitalize">Conta</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="grid grid-cols-2 gap-4">
                                {customerData && (
                                    <>
                                        <div>
                                            <label className="text-sm text-gray-500">Nome</label>
                                            <p className="font-medium">{customerData.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Email</label>
                                            <p className="font-medium">{customerData.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">Telefone</label>
                                            <p className="font-medium">{customerData.phone || "Não informado"}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {activeSection === "médicos" && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold capitalize">{activeSection}</h2>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-zinc-950 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
                            >
                                Adicionar Novo
                            </button>
                        </div>
                        <TableSection
                            data={doctorsData || []}
                            columns={["CRM", "Nome", "Especialidade", "Ações"]}
                            onEdit={(item: any) => {
                                setEditingItem(item);
                                setShowModal(true);
                            }}
                        />
                    </>
                )}
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-zinc-950/25 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Novo {activeSection.slice(0, -1)}</h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createDoctor();
                            }}
                            className="flex flex-col gap-2"
                        >
                            {activeSection === "médicos" && (
                                <>
                                    <input
                                        name="email"
                                        defaultValue={editingItem?.crm}
                                        className="flex w-full border border-zinc-900 px-4 py-2"
                                        placeholder="seu@email.com"
                                        type="email"
                                        required
                                        value={doctorEmail}
                                        onChange={(e) => setDoctorEmail(e.target.value)}
                                    />
                                    <input
                                        name="password"
                                        defaultValue={editingItem?.crm}
                                        className="flex w-full border border-zinc-900 px-4 py-2"
                                        placeholder="senha"
                                        type="password"
                                        required
                                        value={doctorPassword}
                                        onChange={(e) => setDoctorPassword(e.target.value)}
                                    />
                                    <input
                                        name="name"
                                        defaultValue={editingItem?.user.name}
                                        className="flex w-full border border-zinc-900 px-4 py-2"
                                        placeholder="Nome"
                                        type="text"
                                        required
                                        value={doctorName}
                                        onChange={(e) => setDoctorName(e.target.value)}
                                    />
                                    <input
                                        name="crm"
                                        defaultValue={editingItem?.crm}
                                        className="flex w-full border border-zinc-900 px-4 py-2"
                                        placeholder="CRM"
                                        type="text"
                                        required
                                        value={doctorCrm}
                                        onChange={(e) => setDoctorCrm(e.target.value)}
                                    />
                                    <input
                                        name="specialty_name"
                                        defaultValue={editingItem?.specialty_name}
                                        className="flex w-full border border-zinc-900 px-4 py-2"
                                        placeholder="Especialidade"
                                        type="number"
                                        required
                                        value={doctorSpe}
                                        onChange={(e) => setDoctorSpe(Number(e.target.value))}
                                    />
                                </>
                            )}

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingItem(null);
                                    }}
                                    className="px-4 py-2 text-zinc-700 hover:bg-zinc-100 rounded cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-zinc-950 text-white rounded hover:bg-zinc-800 cursor-pointer"
                                >
                                    Criar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const TableSection = ({ data, columns, onEdit, onDelete }: any) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map((col: string) => (
                        <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data && data.map((item: any) => (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.crm}</td>
                        <td className="px-6 py-4">{item.user_name}</td>
                        <td className="px-6 py-4">{item.specialty_id}</td>
                        <td className="px-6 py-4 space-x-2">
                            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900">
                                Editar
                            </button>
                            <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900">
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
