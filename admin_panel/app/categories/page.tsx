import DashboardLayout from "@/component/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, TrendingUp } from "lucide-react";

const categories = [
  {
    id: "CAT-001",
    name: "Chicken",
    icon: "🍗",
    products: 45,
    revenue: "$13,970",
    trend: "+12.5%",
    color: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "CAT-002",
    name: "Seafood",
    icon: "🦐",
    products: 32,
    revenue: "$15,680",
    trend: "+18.2%",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "CAT-003",
    name: "Vegetarian",
    icon: "🥗",
    products: 28,
    revenue: "$8,450",
    trend: "+8.7%",
    color: "bg-green-500/10 border-green-500/20",
  },
  {
    id: "CAT-004",
    name: "Goat",
    icon: "🍛",
    products: 18,
    revenue: "$9,200",
    trend: "+15.3%",
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "CAT-005",
    name: "Lamb",
    icon: "🥩",
    products: 24,
    revenue: "$11,340",
    trend: "+10.8%",
    color: "bg-red-500/10 border-red-500/20",
  },
  {
    id: "CAT-006",
    name: "Dessert",
    icon: "🍰",
    products: 36,
    revenue: "$7,890",
    trend: "+22.1%",
    color: "bg-pink-500/10 border-pink-500/20",
  },
  {
    id: "CAT-007",
    name: "Breakfast",
    icon: "🍳",
    products: 29,
    revenue: "$6,750",
    trend: "+9.4%",
    color: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: "CAT-008",
    name: "Miscellaneous",
    icon: "🍽️",
    products: 41,
    revenue: "$10,230",
    trend: "+14.6%",
    color: "bg-purple-500/10 border-purple-500/20",
  },
];

export default function Categories() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage your food categories and menu organization
            </p>
          </div>
          <Button className="gradient-orange hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-10 bg-background"
            />
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border ${category.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-4xl">
                  {category.icon}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.id}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Products</p>
                    <p className="text-lg font-semibold">{category.products}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold text-primary">
                      {category.revenue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {category.trend}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
