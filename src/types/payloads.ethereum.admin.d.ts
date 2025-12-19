/**
 * Result node information object
 */
export type IResultNodeInfo = {
  /**
   * The node ID
   *
   * @example
   * "0xdc927f8a705175940c6c19dd459b81cf05d21a5a..."
   */
  id: string
  /**
   * The node name
   *
   * @example
   * "Geth/v1.10.x/linux-amd64/go1.16"
   */
  name: string
  /**
   * The node enode
   *
   * @example
   * "enode://7847c21cd566270b284e36506a09040974ed6326..."
   */
  enode: string
  /**
   * The node IP
   *
   * @example
   * "127.0.0.1"
   */
  ip: string
  /**
   * The node ports
   */
  ports: {
    /**
     * The node discovery port
     *
     * @example
     * 30303
     */
    discovery: number
    /**
     * The node listener port
     *
     * @example
     * 30303
     */
    listener: number
  }
  /**
   * The node listen address
   *
   * @example
   * "127.0.0.1:30303"
   */
  listenAddr: string
  /**
   * The node protocols
   */
  protocols: Record<string, any>
}

/**
 * Result peer information object
 */
export type IResultPeer = {
  /**
   * The peer ID
   *
   * @example
   * "0xdc927f8a705175940c6c19dd459b81cf05d21a5a..."
   */
  id: string
  /**
   * The peer name
   *
   * @example
   * "Geth/v1.10.x/linux-amd64/go1.16"
   */
  name: string
  /**
   * The peer capabilities
   *
   * @example
   * ["eth/65", "eth/66"]
   */
  caps: string[]
  /**
   * The peer network information
   */
  network: {
    /**
     * The local address of the peer
     *
     * @example
     * "127.0.0.1:50505"
     */
    localAddress: string
    /**
     * The remote address of the peer
     *
     * @example
     * "127.0.0.1:30303"
     */
    remoteAddress: string
    /**
     * Whether the peer is inbound
     *
     * @example
     * true
     */
    inbound: boolean
    /**
     * Whether the peer is trusted
     *
     * @example
     * false
     */
    trusted: boolean
    /**
     * Whether the peer is static
     *
     * @example
     * false
     */
    static: boolean
  }
  protocols: Record<string, any>
}
