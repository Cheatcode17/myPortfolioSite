import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageViewStats {
  totalViews: number;
  uniquePages: number;
  topPages: { page: string; count: number }[];
  recentViews: any[];
}

const Analytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<PageViewStats>({
    totalViews: 0,
    uniquePages: 0,
    topPages: [],
    recentViews: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch all page views
      const { data: views, error } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (views) {
        // Calculate stats
        const totalViews = views.length;
        const uniquePagesSet = new Set(views.map((v) => v.page_path));
        const uniquePages = uniquePagesSet.size;

        // Count page views by page
        const pageCounts = views.reduce((acc: any, view) => {
          acc[view.page_path] = (acc[view.page_path] || 0) + 1;
          return acc;
        }, {});

        const topPages = Object.entries(pageCounts)
          .map(([page, count]) => ({ page, count: count as number }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setStats({
          totalViews,
          uniquePages,
          topPages,
          recentViews: views.slice(0, 10),
        });
      }
    } catch (error: any) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Site <span className="text-primary">Analytics</span>
            </h1>
            <p className="text-muted-foreground">
              Track your portfolio's performance and visitor engagement
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalViews}</p>
              </div>
              <Eye className="h-10 w-10 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Unique Pages</p>
                <p className="text-3xl font-bold text-foreground">{stats.uniquePages}</p>
              </div>
              <Users className="h-10 w-10 text-secondary opacity-50" />
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Views/Page</p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.uniquePages > 0
                    ? Math.round(stats.totalViews / stats.uniquePages)
                    : 0}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-accent opacity-50" />
            </div>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="p-6 border-border bg-card mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Top Pages
          </h2>
          <div className="space-y-3">
            {stats.topPages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">
                    #{index + 1}
                  </span>
                  <span className="font-mono text-foreground">{page.page}</span>
                </div>
                <span className="text-muted-foreground">
                  {page.count} views
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Views */}
        <Card className="p-6 border-border bg-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-secondary" />
            Recent Views
          </h2>
          <div className="space-y-2">
            {stats.recentViews.map((view) => (
              <div
                key={view.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border text-sm"
              >
                <span className="font-mono text-foreground">{view.page_path}</span>
                <span className="text-muted-foreground">
                  {new Date(view.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
