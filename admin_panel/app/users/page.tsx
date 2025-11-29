import DashboardLayout from "@/component/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, UserPlus, Edit, Trash2, Mail, Phone } from "lucide-react";

const users = [
  {
    id: "USR-001",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    role: "customer",
    orders: 24,
    spent: "$2,640",
    status: "active",
    joinDate: "Jan 15, 2024",
  },
  {
    id: "USR-002",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    phone: "+1 (555) 234-5678",
    role: "customer",
    orders: 18,
    spent: "$1,980",
    status: "active",
    joinDate: "Jan 20, 2024",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "mchen@email.com",
    phone: "+1 (555) 345-6789",
    role: "admin",
    orders: 156,
    spent: "$17,820",
    status: "active",
    joinDate: "Dec 01, 2023",
  },
  {
    id: "USR-004",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 456-7890",
    role: "customer",
    orders: 32,
    spent: "$3,520",
    status: "active",
    joinDate: "Feb 05, 2024",
  },
  {
    id: "USR-005",
    name: "Joshua Martinez",
    email: "josh.m@email.com",
    phone: "+1 (555) 567-8901",
    role: "moderator",
    orders: 45,
    spent: "$4,950",
    status: "active",
    joinDate: "Jan 08, 2024",
  },
  {
    id: "USR-006",
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    phone: "+1 (555) 678-9012",
    role: "customer",
    orders: 12,
    spent: "$1,320",
    status: "inactive",
    joinDate: "Mar 12, 2024",
  },
  {
    id: "USR-007",
    name: "Daniel Lee",
    email: "daniel.lee@email.com",
    phone: "+1 (555) 789-0123",
    role: "customer",
    orders: 8,
    spent: "$880",
    status: "active",
    joinDate: "Mar 18, 2024",
  },
  {
    id: "USR-008",
    name: "Sophia Taylor",
    email: "sophia.t@email.com",
    phone: "+1 (555) 890-1234",
    role: "customer",
    orders: 28,
    spent: "$3,080",
    status: "active",
    joinDate: "Feb 22, 2024",
  },
];

const roleConfig = {
  admin: {
    label: "Admin",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  moderator: {
    label: "Moderator",
    color: "bg-info/10 text-info border-info/20",
  },
  customer: {
    label: "Customer",
    color: "bg-muted text-muted-foreground border-border",
  },
};

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-success/10 text-success border-success/20",
  },
  inactive: {
    label: "Inactive",
    color: "bg-muted text-muted-foreground border-border",
  },
};

export default function Users() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage your customers and team members
            </p>
          </div>
          <Button className="gradient-orange hover:opacity-90 transition-opacity">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email or phone..."
                className="pl-10 bg-background"
              />
            </div>
            <Button variant="outline" className="border-primary/20">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-bold">User</TableHead>
                <TableHead className="font-bold">Contact</TableHead>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="font-bold">Orders</TableHead>
                <TableHead className="font-bold">Total Spent</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Join Date</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                
                return (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-primary/20 text-primary">
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={roleConfig[user.role as keyof typeof roleConfig].color}
                      >
                        {roleConfig[user.role as keyof typeof roleConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.orders}</TableCell>
                    <TableCell className="font-semibold text-primary">
                      {user.spent}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusConfig[user.status as keyof typeof statusConfig].color}
                      >
                        {statusConfig[user.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.joinDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
