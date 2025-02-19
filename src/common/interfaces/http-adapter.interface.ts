export interface HTTPAdapter {
  get<T>(url: string, options?: Record<string, any>): Promise<T>;
  post<T>(url: string, data: T, options?: Record<string, any>): Promise<T>;
  patch<T>(url: string, data: T, options?: Record<string, any>): Promise<T>;
  delete<T>(url: string, options?: Record<string, any>): Promise<T>;
}
