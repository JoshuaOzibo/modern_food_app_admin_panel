import DashboardLayout from "@/component/DashboardLayout";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage food categories
          </p>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Categories page coming soon...
        </div>
      </div>
    </DashboardLayout>
  );
}
