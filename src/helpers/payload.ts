export class PayloadHelper {
  public static build<T = any>(method: string, params: any[] = [], format?: (raw: any) => T) {
    return { method, params, format }
  }

  public static reformat<T = any>(payload: ReturnType<(typeof this)[`build`]>, format: (raw: any) => T) {
    return {
      ...payload,
      format
    }
  }
}
