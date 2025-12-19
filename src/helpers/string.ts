export class StringHelper {
  public static toHex(str: number | bigint) {
    return `0x` + str.toString(16)
  }
}
