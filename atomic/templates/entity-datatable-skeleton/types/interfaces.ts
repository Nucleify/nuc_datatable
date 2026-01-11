import type { ColumnInterface, LoadingType } from 'atomic'

export interface NucSkeletonDataTableInterface {
  rows: []
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
