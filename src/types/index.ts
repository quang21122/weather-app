// Re-export all types for easy importing
export * from './weather';
export * from './components';

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API related types
export interface ApiError {
  message: string;
  code?: string | number;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Event handler types
export type EventHandler<T = void> = () => T;
export type EventHandlerWithParam<P, T = void> = (param: P) => T;

// Async function types
export type AsyncEventHandler = () => Promise<void>;
export type AsyncEventHandlerWithParam<P> = (param: P) => Promise<void>;
