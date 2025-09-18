import AdminNavbar from "../admin/AdminNavbar";
import ClientForm from "../admin/ClientForm";

export default function AdminCreateClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
      <AdminNavbar />
      <div className="ml-64 p-8">
        <ClientForm />
      </div>
    </div>
  );
}
