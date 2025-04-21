export interface JsonResponse<T = undefined> {
  ok: boolean;
  status: number;
  message: string;
  data?: T | T[] | string | null;
}
