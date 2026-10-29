export type ResourceLevel = 'basico' | 'intermedio' | 'avanzado';
export type ResourceType = 'video' | 'lectura' | 'practica' | 'documento';

export const LEVEL_LABELS: Record<ResourceLevel, string> = {
  basico: 'Basico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export type ResourceCategory =
  | 'Capacitor'
  | 'Android'
  | 'HTML y CSS'
  | 'JavaScript'
  | 'Diseño móvil'
  | 'Navegación';

export interface StudyResource {
  id: string;
  title: string;
  category: ResourceCategory;
  author: string;
  durationMinutes: number;
  level: ResourceLevel;
  description: string;
  type: ResourceType;
  coverColor: string;
  contentUrl: string;
  status: 'pendiente';
}

export interface LifecycleEvent {
  name: string;
  timestamp: string;
  isActive?: boolean;
}
