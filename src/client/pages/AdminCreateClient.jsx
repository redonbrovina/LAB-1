import AdminNavbar from "../components/admin/AdminNavbar";
import ClientForm from "../components/admin/ClientForm";

export default function AdminCreateClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
      <AdminNavbar />
      <ClientForm />
    </div>
  );
}
