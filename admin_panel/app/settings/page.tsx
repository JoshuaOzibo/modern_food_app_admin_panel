import DashboardLayout from "@/component/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage application settings
          </p>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Settings page coming soon...
        </div>
      </div>
    </DashboardLayout>
  );
}
