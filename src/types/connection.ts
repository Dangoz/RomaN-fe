/**
 * structure for social connection (CyberConnect)
 * EX: likers, likings, matches, block, recommendation...
 */
export interface IConnection {
  address: string
  domain: string
  avatar: string
  alias: string
}

/**
 * structure for CyberConnect recommendation results
 */
export interface IRecommendation {
  address: string
  domain: string
  avatar: string
  recommendationReason: string
}
