import DashboardLayout from "@/components/DashboardLayout";
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
import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";

const products = [
  {
    id: "PRD-001",
    name: "Spicy Crispy Chicken Burger",
    category: "Chicken",
    price: "$110",
    stock: 45,
    status: "in-stock",
    image: "🍔",
  },
  {
    id: "PRD-002",
    name: "Cajun Spiced Seafood Platter",
    category: "Seafood",
    price: "$160",
    stock: 23,
    status: "in-stock",
    image: "🦐",
  },
  {
    id: "PRD-003",
    name: "Cabbage Soup with Herbs",
    category: "Vegetarian",
    price: "$200",
    stock: 8,
    status: "low-stock",
    image: "🥣",
  },
  {
    id: "PRD-004",
    name: "Callaloo Jamaican Special",
    category: "Miscellaneous",
    price: "$170",
    stock: 34,
    status: "in-stock",
    image: "🥗",
  },
  {
    id: "PRD-005",
    name: "Goat Curry",
    category: "Goat",
    price: "$125",
    stock: 0,
    status: "out-of-stock",
    image: "🍛",
  },
  {
    id: "PRD-006",
    name: "Lamb Chops Grilled",
    category: "Lamb",
    price: "$145",
    stock: 28,
    status: "in-stock",
    image: "🥩",
  },
  {
    id: "PRD-007",
    name: "Chocolate Dessert",
    category: "Dessert",
    price: "$85",
    stock: 52,
    status: "in-stock",
    image: "🍰",
  },
  {
    id: "PRD-008",
    name: "Breakfast Special",
    category: "Breakfast",
    price: "$95",
    stock: 41,
    status: "in-stock",
    image: "🍳",
  },
];

const stockConfig = {
  "in-stock": { 
    label: "In Stock", 
    color: "bg-success/10 text-success border-success/20"
  },
  "low-stock": { 
    label: "Low Stock", 
    color: "bg-warning/10 text-warning border-warning/20"
  },
  "out-of-stock": { 
    label: "Out of Stock", 
    color: "bg-destructive/10 text-destructive border-destructive/20"
  },
};

export default function Products() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your food menu and inventory
            </p>
          </div>
          <Button className="gradient-orange hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or category..."
                className="pl-10 bg-background"
              />
            </div>
            <Button variant="outline" className="border-primary/20">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Stock</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow 
                  key={product.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted/50">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {product.price}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.stock} units
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={stockConfig[product.status as keyof typeof stockConfig].color}
                    >
                      {stockConfig[product.status as keyof typeof stockConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
