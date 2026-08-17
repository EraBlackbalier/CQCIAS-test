export interface Persona {
  id: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string | null;
  telefono: string;
  estatus: 'A' | 'I';
}
