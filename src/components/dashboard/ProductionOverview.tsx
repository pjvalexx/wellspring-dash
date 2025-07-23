import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Droplets, Zap, Fuel, Activity } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const KPICard = ({ title, value, unit, change, icon, color }: KPICardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-danger mr-1" />
          )}
          <span className={`text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="text-sm text-muted-foreground ml-1">vs ayer</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProductionOverviewProps {
  selectedDate: string;
}

export default function ProductionOverview({ selectedDate }: ProductionOverviewProps) {
  // Mock data - En una aplicación real, esto vendría de una API
  const productionData = {
    totalCrude: 12450,
    injection: 8200,
    pumping: 4850,
    diluentReceived: 320,
    diluentConsumed: 285,
    apiGravity: 18.5,
    waterAndSediments: 2.8
  };

  const kpiData = [
    {
      title: "Producción de Crudo",
      value: productionData.totalCrude.toLocaleString(),
      unit: "bbl/día",
      change: 5.2,
      icon: <Droplets className="h-4 w-4 text-white" />,
      color: "bg-gradient-oil"
    },
    {
      title: "Inyección Total",
      value: productionData.injection.toLocaleString(),
      unit: "bbl/día",
      change: 2.1,
      icon: <Zap className="h-4 w-4 text-white" />,
      color: "bg-injection-primary"
    },
    {
      title: "Bombeo Total",
      value: productionData.pumping.toLocaleString(),
      unit: "bbl/día",
      change: -1.5,
      icon: <Activity className="h-4 w-4 text-white" />,
      color: "bg-gas-primary"
    },
    {
      title: "Diluente Consumido",
      value: productionData.diluentConsumed.toString(),
      unit: "bbl/día",
      change: 0.8,
      icon: <Fuel className="h-4 w-4 text-white" />,
      color: "bg-warning"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Visión General de Producción</h2>
          <p className="text-muted-foreground">Fecha: {new Date(selectedDate).toLocaleDateString('es-ES')}</p>
        </div>
      </div>

      {/* Producción total destacada */}
      <Card className="bg-gradient-primary text-white shadow-elevated">
        <CardHeader>
          <CardTitle className="text-white/90">Producción Total de Crudo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">
            {productionData.totalCrude.toLocaleString()} bbl/día
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="text-lg">+5.2% vs día anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Variables físicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Variables Físicas Promedio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">°API:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {productionData.apiGravity}°
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">% AyS:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {productionData.waterAndSediments}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Diluente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Recibido:</span>
              <span className="font-semibold">{productionData.diluentReceived} bbl</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Consumido:</span>
              <span className="font-semibold">{productionData.diluentConsumed} bbl</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Balance:</span>
              <Badge variant="outline" className="font-semibold">
                +{productionData.diluentReceived - productionData.diluentConsumed} bbl
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Eficiencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Utilización:</span>
              <Badge variant="default" className="bg-success">98.5%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Meta del día:</span>
              <Badge variant="outline">12,000 bbl</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">vs Meta:</span>
              <Badge variant="default" className="bg-success">+3.8%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}