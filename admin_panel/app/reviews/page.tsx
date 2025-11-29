import DashboardLayout from "@/component/DashboardLayout";

export default function ReviewsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer reviews
          </p>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Reviews page coming soon...
        </div>
      </div>
    </DashboardLayout>
  );
}
