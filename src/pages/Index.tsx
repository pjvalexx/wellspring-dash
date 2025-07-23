import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="gap-2 bg-background/80 backdrop-blur-sm"
        >
          <Settings className="h-4 w-4" />
          Administración
        </Button>
      </div>
      
      <Dashboard />
    </div>
  );
};

export default Index;
