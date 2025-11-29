import DashboardLayout from "@/component/DashboardLayout";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts
          </p>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Users page coming soon...
        </div>
      </div>
    </DashboardLayout>
  );
}
