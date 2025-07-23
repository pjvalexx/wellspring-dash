import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const productionSchema = z.object({
  date: z.date({ required_error: "La fecha es requerida" }),
  crudeProduction: z.number().min(0, "Debe ser un valor positivo"),
  injection: z.number().min(0, "Debe ser un valor positivo"),
  mechanicalPumping: z.number().min(0, "Debe ser un valor positivo"),
  electricPumping: z.number().min(0, "Debe ser un valor positivo"),
  gasPumping: z.number().min(0, "Debe ser un valor positivo"),
  diluentReceived: z.number().min(0, "Debe ser un valor positivo"),
  diluentConsumed: z.number().min(0, "Debe ser un valor positivo"),
  apiGravity: z.number().min(0).max(100, "°API debe estar entre 0 y 100"),
  waterAndSediments: z.number().min(0).max(100, "% AyS debe estar entre 0 y 100"),
});

type ProductionFormData = z.infer<typeof productionSchema>;

export const ProductionDataForm = () => {
  const { toast } = useToast();
  
  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      crudeProduction: 0,
      injection: 0,
      mechanicalPumping: 0,
      electricPumping: 0,
      gasPumping: 0,
      diluentReceived: 0,
      diluentConsumed: 0,
      apiGravity: 0,
      waterAndSediments: 0,
    },
  });

  const onSubmit = (data: ProductionFormData) => {
    console.log("Datos de producción:", data);
    toast({
      title: "Datos guardados",
      description: "Los datos de producción han sido registrados exitosamente",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Producción</FormLabel>
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

          {/* Producción de Crudo */}
          <FormField
            control={form.control}
            name="crudeProduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producción de Crudo (barriles)</FormLabel>
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

        {/* Inyección y Bombeo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inyección y Bombeo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="injection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inyección (barriles)</FormLabel>
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
                name="mechanicalPumping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bombeo Mecánico</FormLabel>
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
                name="electricPumping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bombeo Eléctrico</FormLabel>
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
                name="gasPumping"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bombeo por Gas</FormLabel>
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
          </CardContent>
        </Card>

        {/* Diluente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diluente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="diluentReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diluente Recibido (barriles)</FormLabel>
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
                name="diluentConsumed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diluente Consumido (barriles)</FormLabel>
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
          </CardContent>
        </Card>

        {/* Variables Físicas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Variables Físicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="apiGravity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>°API</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="0.0"
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
                name="waterAndSediments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% Agua y Sedimentos</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="0.0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Guardar Datos de Producción
        </Button>
      </form>
    </Form>
  );
};