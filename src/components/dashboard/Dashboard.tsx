import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BarChart3, TrendingUp, Layers, Droplets } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ProductionOverview from "./ProductionOverview";
import ProductionByField from "./ProductionByField";
import ProductionHistory from "./ProductionHistory";
import WellsByCategory from "./WellsByCategory";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white shadow-elevated">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard de Producción Petrolera</h1>
              <p className="text-white/80">Monitoreo y análisis en tiempo real</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, 'dd MMMM yyyy', { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-card">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visión General
            </TabsTrigger>
            <TabsTrigger value="fields" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Por Campo
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="wells" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Pozos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ProductionOverview selectedDate={selectedDate.toISOString()} />
          </TabsContent>

          <TabsContent value="fields" className="space-y-6">
            <ProductionByField selectedDate={selectedDate.toISOString()} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <ProductionHistory selectedDate={selectedDate.toISOString()} />
          </TabsContent>

          <TabsContent value="wells" className="space-y-6">
            <WellsByCategory selectedDate={selectedDate.toISOString()} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-card border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              © 2024 Dashboard de Producción. Datos actualizados en tiempo real.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Última actualización: {format(new Date(), 'HH:mm:ss')}</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>En línea</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}