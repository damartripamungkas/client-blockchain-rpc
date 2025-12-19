import { PayloadHelper as hlp } from "~/helpers/payload"
import type { IHash, IAddress, IBlockTag, ITransactionRequest } from "~/types/payloads.ethereum"
import type { ITraceResult, IResultGcStats, IResultBadBlock, ITraceOptions, IResultDumpBlock, IResultStorageRange } from "~/types/payloads.ethereum.debug"

export class EthereumDebugPayload {
  public static dumpBlock(block: IBlockTag) {
    return hlp.build<IResultDumpBlock>(`debug_dumpBlock`, [block])
  }

  public static gcStats() {
    return hlp.build<IResultGcStats>(`debug_gcStats`, [])
  }

  public static getBadBlocks() {
    return hlp.build<IResultBadBlock[]>(`debug_getBadBlocks`, [])
  }

  public static storageRangeAt(block: IBlockTag, txIndex: number, address: IAddress, start: string, limit: number) {
    return hlp.build<IResultStorageRange>(`debug_storageRangeAt`, [block, txIndex, address, start, limit])
  }

  public static traceBlock<T extends string | undefined = undefined>(block: IBlockTag, options?: ITraceOptions<T>) {
    return hlp.build<ITraceResult<T>[]>(`debug_traceBlock`, options ? [block, options] : [block])
  }

  public static traceBlockByHash<T extends string | undefined = undefined>(hash: IHash, options?: ITraceOptions<T>) {
    return hlp.build<ITraceResult<T>[]>(`debug_traceBlockByHash`, options ? [hash, options] : [hash])
  }

  public static traceBlockByNumber<T extends string | undefined = undefined>(block: IBlockTag, options?: ITraceOptions<T>) {
    return hlp.build<ITraceResult<T>[]>(`debug_traceBlockByNumber`, options ? [block, options] : [block])
  }

  public static traceCall<T extends string | undefined = undefined>(transaction: ITransactionRequest, block: IBlockTag, options?: ITraceOptions<T>) {
    return hlp.build<ITraceResult<T>>(`debug_traceCall`, options ? [transaction, block, options] : [transaction, block])
  }

  public static traceTransaction<T extends string | undefined = undefined>(hash: IHash, options?: ITraceOptions<T>) {
    return hlp.build<ITraceResult<T>>(`debug_traceTransaction`, options ? [hash, options] : [hash])
  }
}
