export type IMethod = string
export type IParams = any[] | Record<any, any>
export type IPayload<T = any> = {
  method: IMethod
  params: IParams
  format?: (value: any) => T
}
