import type { ColumnInterface, LoadingType } from 'nucleify'

export interface NucSkeletonDataTableInterface {
  nuiType: string
  rows: unknown[]
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
