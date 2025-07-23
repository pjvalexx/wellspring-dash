import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

interface ProductionByStationProps {
  selectedDate: string;
}

export default function ProductionByStation({ selectedDate }: ProductionByStationProps) {
  const [selectedField, setSelectedField] = useState("todos");
  const [selectedShift, setSelectedShift] = useState("todos");

  // Mock data - En una aplicación real, esto vendría de una API
  const stationData = [
    {
      name: "Estación A-1",
      crude: 3200,
      pumpingESP: 850,
      pumpingPCP: 420,
      injection: 2100,
      field: "campo1"
    },
    {
      name: "Estación A-2",
      crude: 2800,
      pumpingESP: 720,
      pumpingPCP: 380,
      injection: 1850,
      field: "campo1"
    },
    {
      name: "Estación B-1",
      crude: 2950,
      pumpingESP: 780,
      pumpingPCP: 450,
      injection: 1950,
      field: "campo2"
    },
    {
      name: "Estación B-2",
      crude: 2200,
      pumpingESP: 580,
      pumpingPCP: 320,
      injection: 1420,
      field: "campo2"
    },
    {
      name: "Estación C-1",
      crude: 1300,
      pumpingESP: 350,
      pumpingPCP: 180,
      injection: 850,
      field: "campo3"
    }
  ];

  // Filtrar datos según selección
  const filteredData = stationData.filter(station => {
    if (selectedField !== "todos" && station.field !== selectedField) return false;
    return true;
  }).map(station => ({
    ...station,
    pumpingTotal: station.pumpingESP + station.pumpingPCP
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Producción por Estación</h2>
          <p className="text-muted-foreground">Distribución por campo y estación</p>
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Seleccionar campo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los campos</SelectItem>
              <SelectItem value="campo1">Campo 1</SelectItem>
              <SelectItem value="campo2">Campo 2</SelectItem>
              <SelectItem value="campo3">Campo 3</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Seleccionar turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los turnos</SelectItem>
              <SelectItem value="matutino">Matutino</SelectItem>
              <SelectItem value="vespertino">Vespertino</SelectItem>
              <SelectItem value="nocturno">Nocturno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gráfico de Producción de Crudo */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-oil rounded-full"></div>
            Producción de Crudo por Estación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="crude" fill="hsl(var(--oil-primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Bombeo */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gas-primary rounded-full"></div>
            Bombeo por Estación y Tipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="pumpingESP" 
                name="Bombeo ESP"
                fill="hsl(var(--gas-primary))" 
                radius={[0, 0, 0, 0]} 
              />
              <Bar 
                dataKey="pumpingPCP" 
                name="Bombeo PCP"
                fill="hsl(var(--gas-primary) / 0.7)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Inyección */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-injection-primary rounded-full"></div>
            Inyección por Estación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="injection" fill="hsl(var(--injection-primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resumen por campo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["campo1", "campo2", "campo3"].map((field, index) => {
          const fieldData = stationData.filter(station => station.field === field);
          const totalCrude = fieldData.reduce((sum, station) => sum + station.crude, 0);
          const totalInjection = fieldData.reduce((sum, station) => sum + station.injection, 0);
          
          return (
            <Card key={field} className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Campo {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estaciones:</span>
                  <span className="font-semibold">{fieldData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crudo total:</span>
                  <span className="font-semibold">{totalCrude.toLocaleString()} bbl/día</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inyección total:</span>
                  <span className="font-semibold">{totalInjection.toLocaleString()} bbl/día</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}