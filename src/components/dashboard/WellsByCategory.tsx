import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, AlertTriangle, XCircle, Settings, Wrench } from "lucide-react";

interface WellsByCategoryProps {
  selectedDate: string;
}

export default function WellsByCategory({ selectedDate }: WellsByCategoryProps) {
  // Mock data - En una aplicación real, esto vendría de una API
  const categoryData = [
    {
      id: 1,
      name: "Pozos Activos",
      description: "Pozos en operación normal",
      count: 156,
      production: 12450,
      icon: <Activity className="h-5 w-5" />,
      color: "hsl(var(--success))",
      bgColor: "bg-success/10",
      borderColor: "border-success",
      dailyTrend: [
        { day: "Lun", count: 158, production: 12200 },
        { day: "Mar", count: 157, production: 12350 },
        { day: "Mié", count: 156, production: 12180 },
        { day: "Jue", count: 157, production: 12400 },
        { day: "Vie", count: 156, production: 12450 },
      ]
    },
    {
      id: 2,
      name: "Pozos Inactivos - Daños Menores",
      description: "Requieren mantenimiento menor",
      count: 23,
      production: 0,
      icon: <Settings className="h-5 w-5" />,
      color: "hsl(var(--warning))",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      dailyTrend: [
        { day: "Lun", count: 20, production: 0 },
        { day: "Mar", count: 22, production: 0 },
        { day: "Mié", count: 24, production: 0 },
        { day: "Jue", count: 23, production: 0 },
        { day: "Vie", count: 23, production: 0 },
      ]
    },
    {
      id: 3,
      name: "Pozos Inactivos - Daños Mayores",
      description: "Requieren reparación mayor",
      count: 8,
      production: 0,
      icon: <Wrench className="h-5 w-5" />,
      color: "hsl(var(--danger))",
      bgColor: "bg-danger/10",
      borderColor: "border-danger",
      dailyTrend: [
        { day: "Lun", count: 9, production: 0 },
        { day: "Mar", count: 8, production: 0 },
        { day: "Mié", count: 8, production: 0 },
        { day: "Jue", count: 8, production: 0 },
        { day: "Vie", count: 8, production: 0 },
      ]
    },
    {
      id: 4,
      name: "Pozos en Evaluación",
      description: "En proceso de análisis técnico",
      count: 5,
      production: 0,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "hsl(var(--primary))",
      bgColor: "bg-primary/10",
      borderColor: "border-primary",
      dailyTrend: [
        { day: "Lun", count: 4, production: 0 },
        { day: "Mar", count: 5, production: 0 },
        { day: "Mié", count: 5, production: 0 },
        { day: "Jue", count: 5, production: 0 },
        { day: "Vie", count: 5, production: 0 },
      ]
    },
    {
      id: 5,
      name: "Pozos Abandonados",
      description: "Fuera de operación permanente",
      count: 12,
      production: 0,
      icon: <XCircle className="h-5 w-5" />,
      color: "hsl(var(--muted-foreground))",
      bgColor: "bg-muted",
      borderColor: "border-muted",
      dailyTrend: [
        { day: "Lun", count: 12, production: 0 },
        { day: "Mar", count: 12, production: 0 },
        { day: "Mié", count: 12, production: 0 },
        { day: "Jue", count: 12, production: 0 },
        { day: "Vie", count: 12, production: 0 },
      ]
    }
  ];

  const totalWells = categoryData.reduce((sum, cat) => sum + cat.count, 0);
  const totalProduction = categoryData.reduce((sum, cat) => sum + cat.production, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-1">{data.day}</p>
          <p className="text-sm">Pozos: {data.count}</p>
          {data.production > 0 && (
            <p className="text-sm">Producción: {data.production.toLocaleString()} bbl/día</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pozos por Categoría</h2>
          <p className="text-muted-foreground">
            Total: {totalWells} pozos | Producción: {totalProduction.toLocaleString()} bbl/día
          </p>
        </div>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Distribución de Pozos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [
                    `${value} pozos (${((value / totalWells) * 100).toFixed(1)}%)`,
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Eficiencia Operativa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pozos activos:</span>
              <Badge variant="default" className="bg-success">
                {((categoryData[0].count / totalWells) * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Pozos inactivos:</span>
              <Badge variant="outline">
                {(((categoryData[1].count + categoryData[2].count) / totalWells) * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Producción promedio:</span>
              <span className="font-semibold">
                {Math.round(totalProduction / categoryData[0].count)} bbl/pozo
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Estado del Campo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm">Operación normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm">Requiere atención</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger rounded-full"></div>
              <span className="text-sm">Fuera de servicio</span>
            </div>
            <div className="pt-2 border-t">
              <span className="text-sm font-semibold">
                Meta de pozos activos: 160
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos individuales por categoría */}
      <div className="space-y-6">
        {categoryData.map((category) => (
          <Card key={category.id} className={`shadow-card border-l-4 ${category.borderColor}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.bgColor}`} style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold" style={{ color: category.color }}>
                    {category.count}
                  </div>
                  <p className="text-sm text-muted-foreground">pozos</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Métricas */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Métricas</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de pozos:</span>
                      <span className="font-semibold">{category.count}</span>
                    </div>
                    {category.production > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Producción total:</span>
                          <span className="font-semibold">{category.production.toLocaleString()} bbl/día</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Producción promedio:</span>
                          <span className="font-semibold">
                            {Math.round(category.production / category.count)} bbl/pozo
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">% del total:</span>
                      <Badge variant="outline">
                        {((category.count / totalWells) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Evolución diaria */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold mb-4">Evolución de la semana</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={category.dailyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="count" 
                        fill={category.color}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Acciones recomendadas para categorías inactivas */}
              {category.id === 2 && (
                <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h5 className="font-semibold text-warning mb-2">Acciones Recomendadas</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Programar mantenimiento preventivo</li>
                    <li>• Revisión de equipos de bombeo</li>
                    <li>• Limpieza de líneas de producción</li>
                  </ul>
                </div>
              )}

              {category.id === 3 && (
                <div className="mt-4 p-4 bg-danger/10 rounded-lg border border-danger/20">
                  <h5 className="font-semibold text-danger mb-2">Acciones Urgentes</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Reparación de equipos críticos</li>
                    <li>• Reemplazo de componentes dañados</li>
                    <li>• Evaluación de viabilidad económica</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}