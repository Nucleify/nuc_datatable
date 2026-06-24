import type { ColumnInterface, LoadingType } from 'nucleify'

export interface NucSkeletonDataTableInterface {
  adType: string
  rows: unknown[]
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
