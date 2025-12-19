export class PayloadHelper {
  public static build<T = any>(method: string, params: any[] = [], format?: (raw: any) => T) {
    return { method, params, format }
  }
}
