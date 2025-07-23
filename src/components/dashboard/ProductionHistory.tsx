import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";

interface ProductionHistoryProps {
  selectedDate: string;
}

export default function ProductionHistory({ selectedDate }: ProductionHistoryProps) {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(selectedDate), 30),
    to: new Date(selectedDate)
  });

  const [selectedVariables, setSelectedVariables] = useState({
    crude: true,
    pumping: true,
    injection: true,
    diluent: false
  });

  // Mock data - En una aplicación real, esto vendría de una API
  const generateHistoricalData = () => {
    const data = [];
    const start = new Date(dateRange.from);
    const end = new Date(dateRange.to);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const baseProduction = 12000;
      const variation = Math.sin((d.getDate() / 30) * Math.PI * 2) * 1000 + Math.random() * 500;
      
      data.push({
        date: format(d, 'yyyy-MM-dd'),
        dateFormatted: format(d, 'dd/MM', { locale: es }),
        crude: Math.round(baseProduction + variation),
        pumping: Math.round((baseProduction + variation) * 0.4),
        injection: Math.round((baseProduction + variation) * 0.65),
        diluent: Math.round(200 + Math.random() * 100)
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = historicalData.find(d => d.dateFormatted === label)?.date;
      const formattedDate = date ? format(new Date(date), 'dd MMMM yyyy', { locale: es }) : label;
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{formattedDate}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()} bbl/día
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const toggleVariable = (variable: keyof typeof selectedVariables) => {
    setSelectedVariables(prev => ({
      ...prev,
      [variable]: !prev[variable]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Histórico de Producción</h2>
          <p className="text-muted-foreground">Tendencias y análisis temporal</p>
        </div>
        
        <div className="flex gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'dd/MM/yyyy', { locale: es })} - {format(dateRange.to, 'dd/MM/yyyy', { locale: es })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Rango de fechas disponible</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDateRange({
                      from: subDays(new Date(selectedDate), 7),
                      to: new Date(selectedDate)
                    })}
                  >
                    Últimos 7 días
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDateRange({
                      from: subDays(new Date(selectedDate), 30),
                      to: new Date(selectedDate)
                    })}
                  >
                    Últimos 30 días
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDateRange({
                      from: subDays(new Date(selectedDate), 90),
                      to: new Date(selectedDate)
                    })}
                  >
                    Últimos 90 días
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDateRange({
                      from: subDays(new Date(selectedDate), 365),
                      to: new Date(selectedDate)
                    })}
                  >
                    Último año
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Controles de variables */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Variables a mostrar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedVariables.crude ? "default" : "outline"}
              size="sm"
              onClick={() => toggleVariable('crude')}
              className={selectedVariables.crude ? "bg-oil-primary hover:bg-oil-primary/90" : ""}
            >
              <div className="w-3 h-3 bg-oil-primary rounded-full mr-2"></div>
              Producción de Crudo
            </Button>
            <Button
              variant={selectedVariables.pumping ? "default" : "outline"}
              size="sm"
              onClick={() => toggleVariable('pumping')}
              className={selectedVariables.pumping ? "bg-gas-primary hover:bg-gas-primary/90" : ""}
            >
              <div className="w-3 h-3 bg-gas-primary rounded-full mr-2"></div>
              Bombeo Total
            </Button>
            <Button
              variant={selectedVariables.injection ? "default" : "outline"}
              size="sm"
              onClick={() => toggleVariable('injection')}
              className={selectedVariables.injection ? "bg-injection-primary hover:bg-injection-primary/90" : ""}
            >
              <div className="w-3 h-3 bg-injection-primary rounded-full mr-2"></div>
              Inyección
            </Button>
            <Button
              variant={selectedVariables.diluent ? "default" : "outline"}
              size="sm"
              onClick={() => toggleVariable('diluent')}
              className={selectedVariables.diluent ? "bg-warning hover:bg-warning/90" : ""}
            >
              <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
              Consumo de Diluente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico principal */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Tendencia Histórica</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="dateFormatted" 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {selectedVariables.crude && (
                <Line 
                  type="monotone" 
                  dataKey="crude" 
                  name="Producción de Crudo"
                  stroke="hsl(var(--oil-primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--oil-primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {selectedVariables.pumping && (
                <Line 
                  type="monotone" 
                  dataKey="pumping" 
                  name="Bombeo Total"
                  stroke="hsl(var(--gas-primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--gas-primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {selectedVariables.injection && (
                <Line 
                  type="monotone" 
                  dataKey="injection" 
                  name="Inyección"
                  stroke="hsl(var(--injection-primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--injection-primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {selectedVariables.diluent && (
                <Line 
                  type="monotone" 
                  dataKey="diluent" 
                  name="Consumo de Diluente"
                  stroke="hsl(var(--warning))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Estadísticas del período */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Producción Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-oil-primary">
              {Math.round(historicalData.reduce((sum, day) => sum + day.crude, 0) / historicalData.length).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">bbl/día</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Producción Máxima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.max(...historicalData.map(d => d.crude)).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">bbl/día</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Producción Mínima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {Math.min(...historicalData.map(d => d.crude)).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">bbl/día</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Días Analizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {historicalData.length}
            </div>
            <p className="text-sm text-muted-foreground">días</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}