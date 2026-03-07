import type { ColumnInterface, LoadingType } from 'nucleify'

export interface NucSkeletonDataTableInterface {
  rows: []
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
