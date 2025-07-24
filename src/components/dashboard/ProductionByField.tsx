import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProductionByFieldProps {
  selectedDate: string;
}

export default function ProductionByField({ selectedDate }: ProductionByFieldProps) {
  const [selectedField, setSelectedField] = useState<string>("todos");
  const [selectedShift, setSelectedShift] = useState<string>("todos");

  // Mock data for field production
  const fieldData = [
    {
      name: "Campo A-1",
      field: "Norte",
      crude: 2450,
      pumpingESP: 850,
      pumpingPCP: 320,
      injection: 1240
    },
    {
      name: "Campo A-2",
      field: "Norte",
      crude: 1850,
      pumpingESP: 650,
      pumpingPCP: 280,
      injection: 980
    },
    {
      name: "Campo B-1",
      field: "Sur",
      crude: 3200,
      pumpingESP: 1200,
      pumpingPCP: 450,
      injection: 1650
    },
    {
      name: "Campo B-2",
      field: "Sur",
      crude: 2800,
      pumpingESP: 980,
      pumpingPCP: 380,
      injection: 1400
    },
    {
      name: "Campo C-1",
      field: "Este",
      crude: 1950,
      pumpingESP: 720,
      pumpingPCP: 290,
      injection: 1050
    }
  ];

  const filteredData = fieldData.filter(field => {
    if (selectedField !== "todos" && field.field !== selectedField) return false;
    return true;
  }).map(field => ({
    ...field,
    pumpingTotal: field.pumpingESP + field.pumpingPCP
  }));

  const fields = [...new Set(fieldData.map(item => item.field))];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} bbl
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Producción por Campo</h2>
          <p className="text-muted-foreground">Distribución por campo y área</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedField} onValueChange={setSelectedField}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por campo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los campos</SelectItem>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>
                  Campo {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="mañana">Mañana</SelectItem>
              <SelectItem value="tarde">Tarde</SelectItem>
              <SelectItem value="noche">Noche</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Crude Production */}
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">
              Producción de Crudo por Campo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="crude" 
                  fill="hsl(var(--chart-crude))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pumping */}
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">
              Bombeo por Campo y Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="pumpingESP" 
                  fill="hsl(var(--chart-pumping-esp))"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="pumpingPCP" 
                  fill="hsl(var(--chart-pumping-pcp))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Injection */}
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">
              Inyección por Campo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="injection" 
                  fill="hsl(var(--chart-injection))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary by Field */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((field) => {
          const fieldInfo = fieldData.filter(item => item.field === field);
          const totalCrude = fieldInfo.reduce((sum, item) => sum + item.crude, 0);
          const totalInjection = fieldInfo.reduce((sum, item) => sum + item.injection, 0);
          
          return (
            <Card key={field} className="bg-card shadow-card">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Campo {field}</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Total campos: {fieldInfo.length}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Crudo:</span> {totalCrude.toLocaleString()} bbl
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Inyección:</span> {totalInjection.toLocaleString()} bbl
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}