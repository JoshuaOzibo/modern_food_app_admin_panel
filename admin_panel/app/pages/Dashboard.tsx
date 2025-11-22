import DashboardLayout from "@/component/DashboardLayout";
import StatsCard from "@/component/StatsCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const recentOrders = [
  {
    id: "#ORD-2024-001",
    customer: "Alex Johnson",
    item: "Spicy Crispy Chicken Burger",
    amount: "$110",
    status: "delivered",
    time: "2 mins ago",
  },
  {
    id: "#ORD-2024-002",
    customer: "Sarah Williams",
    item: "Cajun Spiced Seafood Platter",
    amount: "$160",
    status: "pending",
    time: "5 mins ago",
  },
  {
    id: "#ORD-2024-003",
    customer: "Michael Chen",
    item: "Cabbage Soup with Herbs",
    amount: "$200",
    status: "preparing",
    time: "8 mins ago",
  },
  {
    id: "#ORD-2024-004",
    customer: "Emma Davis",
    item: "Callaloo Jamaican Special",
    amount: "$170",
    status: "delivered",
    time: "12 mins ago",
  },
];

const topProducts = [
  { name: "Spicy Crispy Chicken Burger", orders: 127, revenue: "$13,970" },
  { name: "Cajun Spiced Seafood", orders: 98, revenue: "$15,680" },
  { name: "Callaloo Jamaican", orders: 85, revenue: "$14,450" },
  { name: "Cabbage Soup", orders: 76, revenue: "$15,200" },
];

const statusConfig = {
  delivered: { label: "Delivered", color: "bg-success/10 text-success", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-warning/10 text-warning", icon: Clock },
  preparing: { label: "Preparing", color: "bg-info/10 text-info", icon: Clock },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, Joshua! Here's what's happening today.
            </p>
          </div>
          <Button className="gradient-orange hover:opacity-90 transition-opacity">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value="$45,231"
            change="+20.1% from last month"
            changeType="positive"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <StatsCard
            title="Total Orders"
            value="2,345"
            change="+15.3% from last month"
            changeType="positive"
            icon={<ShoppingBag className="w-6 h-6" />}
          />
          <StatsCard
            title="Active Users"
            value="1,234"
            change="+12.5% from last month"
            changeType="positive"
            icon={<Users className="w-6 h-6" />}
          />
          <StatsCard
            title="Popular Foods"
            value="127"
            change="Spicy Chicken Burger"
            changeType="neutral"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Latest orders from your customers
                </p>
              </div>
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{order.customer}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{order.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{order.item}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{order.amount}</p>
                      <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top Products */}
          <Card className="p-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Top Products</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Best performing items
              </p>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.orders} orders
                    </p>
                  </div>
                  <p className="font-semibold text-sm text-primary">{product.revenue}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 border-primary/20 hover:bg-primary/5">
              View All Products
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
