import { useState } from 'react';
import { Plus, Trash2, Clock, Users, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Receta, insumosMock } from '../../data/insumopro-mock';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  receta?: Receta;
  onSave?: (receta: Receta) => void;
}

export function RecipeModal({ isOpen, onClose, receta, onSave }: RecipeModalProps) {
  const [isViewMode, setIsViewMode] = useState(!!receta);

  if (!receta) return null;

  const getInsumoNombre = (insumoId: number) => {
    return insumosMock.find((i) => i.id === insumoId)?.nombre || 'Desconocido';
  };

  const getInsumoUnidad = (insumoId: number) => {
    return insumosMock.find((i) => i.id === insumoId)?.unidad || 'kg';
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(receta);
    }
    setIsViewMode(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <span>{receta.nombre}</span>
            <div className="flex items-center gap-2">
              {isViewMode ? (
                <Button onClick={handleEdit} variant="outline" size="sm">
                  Editar
                </Button>
              ) : (
                <>
                  <Button onClick={() => setIsViewMode(true)} variant="outline" size="sm">
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
                    Guardar
                  </Button>
                </>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {receta.categoria}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información general */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Users className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Porciones</p>
                <p className="font-bold text-gray-800">{receta.porciones}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Tiempo</p>
                <p className="font-bold text-gray-800">{receta.tiempoPreparacion} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500">Costo / Precio</p>
                <p className="font-bold text-gray-800">
                  S/ {receta.costo.toFixed(2)} / S/ {receta.precio.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <Label className="text-gray-700 font-semibold mb-2 block">Descripción</Label>
            {isViewMode ? (
              <p className="text-gray-600 p-3 bg-gray-50 rounded-lg">{receta.descripcion}</p>
            ) : (
              <Input
                defaultValue={receta.descripcion}
                placeholder="Descripción de la receta..."
                className="w-full"
              />
            )}
          </div>

          {/* Ingredientes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-gray-700 font-semibold">
                Ingredientes ({receta.ingredientes.length})
              </Label>
              {!isViewMode && (
                <Button size="sm" variant="outline" className="h-8">
                  <Plus size={16} className="mr-1" />
                  Agregar
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {receta.ingredientes.map((ingrediente, index) => {
                const insumo = insumosMock.find((i) => i.id === ingrediente.insumoId);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {getInsumoNombre(ingrediente.insumoId)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Disponible: {insumo?.stockSistema || 0} {getInsumoUnidad(ingrediente.insumoId)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isViewMode ? (
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            {ingrediente.cantidad} {ingrediente.unidad}
                          </p>
                          {insumo && (
                            <p className="text-xs text-gray-500">
                              S/ {(ingrediente.cantidad * insumo.costoUnitario).toFixed(2)}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <Input
                            type="number"
                            step="0.01"
                            defaultValue={ingrediente.cantidad}
                            className="w-20 text-right"
                          />
                          <span className="text-sm text-gray-500 w-12">
                            {ingrediente.unidad}
                          </span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumen de costos */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Costo total de ingredientes:</span>
              <span className="font-bold text-gray-800">S/ {receta.costo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Precio de venta:</span>
              <span className="font-bold text-gray-800">S/ {receta.precio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-green-600">Margen de ganancia:</span>
              <span className="text-green-600">
                S/ {(receta.precio - receta.costo).toFixed(2)} (
                {((receta.precio - receta.costo) / receta.precio * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
