import DashboardLayout from "@/component/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, Eye, CheckCircle2, Clock, XCircle } from "lucide-react";

const orders = [
  {
    id: "#ORD-2024-001",
    customer: "Alex Johnson",
    email: "alex.j@email.com",
    items: "3x Spicy Crispy Chicken Burger",
    total: "$110",
    status: "delivered",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: "#ORD-2024-002",
    customer: "Sarah Williams",
    email: "sarah.w@email.com",
    items: "2x Cajun Spiced Seafood",
    total: "$160",
    status: "pending",
    date: "2024-01-15",
    time: "14:25",
  },
  {
    id: "#ORD-2024-003",
    customer: "Michael Chen",
    email: "m.chen@email.com",
    items: "1x Cabbage Soup, 2x Dessert",
    total: "$200",
    status: "preparing",
    date: "2024-01-15",
    time: "14:20",
  },
  {
    id: "#ORD-2024-004",
    customer: "Emma Davis",
    email: "emma.d@email.com",
    items: "1x Callaloo Jamaican Special",
    total: "$170",
    status: "delivered",
    date: "2024-01-15",
    time: "14:15",
  },
  {
    id: "#ORD-2024-005",
    customer: "James Wilson",
    email: "j.wilson@email.com",
    items: "2x Goat Curry, 1x Lamb Chops",
    total: "$250",
    status: "cancelled",
    date: "2024-01-15",
    time: "14:10",
  },
  {
    id: "#ORD-2024-006",
    customer: "Olivia Brown",
    email: "olivia.b@email.com",
    items: "4x Breakfast Special",
    total: "$180",
    status: "delivered",
    date: "2024-01-15",
    time: "14:05",
  },
  {
    id: "#ORD-2024-007",
    customer: "William Taylor",
    email: "w.taylor@email.com",
    items: "3x Chicken Wings, 2x Beef Burger",
    total: "$220",
    status: "pending",
    date: "2024-01-15",
    time: "14:00",
  },
];

const statusConfig = {
  delivered: { 
    label: "Delivered", 
    color: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2 
  },
  pending: { 
    label: "Pending", 
    color: "bg-warning/10 text-warning border-warning/20",
    icon: Clock 
  },
  preparing: { 
    label: "Preparing", 
    color: "bg-info/10 text-info border-info/20",
    icon: Clock 
  },
  cancelled: { 
    label: "Cancelled", 
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle 
  },
};

export default function Orders() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all customer orders
            </p>
          </div>
          <Button className="gradient-orange hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer name, or email..."
                className="pl-10 bg-background"
              />
            </div>
            <Button variant="outline" className="border-primary/20">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-bold">Order ID</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold">Items</TableHead>
                <TableHead className="font-bold">Total</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Date & Time</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <TableRow 
                    key={order.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium text-primary">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.items}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order.total}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={statusConfig[order.status as keyof typeof statusConfig].color}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>
                        <p className="font-medium">{order.date}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
