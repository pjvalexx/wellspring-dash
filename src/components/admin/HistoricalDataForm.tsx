import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";

const historicalSchema = z.object({
  startDate: z.date({ required_error: "La fecha de inicio es requerida" }),
  endDate: z.date({ required_error: "La fecha de fin es requerida" }),
  dailyProduction: z.number().min(0, "Debe ser un valor positivo"),
  dailyInjection: z.number().min(0, "Debe ser un valor positivo"),
  dailyPumping: z.number().min(0, "Debe ser un valor positivo"),
  diluentConsumption: z.number().min(0, "Debe ser un valor positivo"),
}).refine((data) => data.endDate >= data.startDate, {
  message: "La fecha de fin debe ser posterior a la fecha de inicio",
  path: ["endDate"],
});

type HistoricalFormData = z.infer<typeof historicalSchema>;

export const HistoricalDataForm = () => {
  const { toast } = useToast();
  
  const form = useForm<HistoricalFormData>({
    resolver: zodResolver(historicalSchema),
    defaultValues: {
      dailyProduction: 0,
      dailyInjection: 0,
      dailyPumping: 0,
      diluentConsumption: 0,
    },
  });

  const onSubmit = (data: HistoricalFormData) => {
    console.log("Datos históricos:", data);
    toast({
      title: "Datos guardados",
      description: "Los datos históricos han sido registrados exitosamente",
    });
    form.reset();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aquí se procesaría el archivo CSV/Excel
      toast({
        title: "Archivo cargado",
        description: `Archivo "${file.name}" cargado para procesamiento`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Carga Masiva de Archivos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Carga Masiva de Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cargar datos históricos desde un archivo CSV o Excel con columnas: Fecha, Producción, Inyección, Bombeo, Diluente
            </p>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2" onClick={() => document.getElementById('file-upload')?.click()}>
                <FileText className="h-4 w-4" />
                Seleccionar Archivo
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-sm text-muted-foreground">
                Formatos soportados: CSV, Excel
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario Manual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Carga Manual de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Rango de Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Inicio</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onDateChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Fin</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onDateChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Datos Promedio del Período */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Datos Promedio del Período</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyProduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Producción Diaria Promedio (barriles)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dailyInjection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inyección Diaria Promedio (barriles)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dailyPumping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bombeo Diario Promedio</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diluentConsumption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consumo Diario de Diluente (barriles)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Guardar Datos Históricos
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};