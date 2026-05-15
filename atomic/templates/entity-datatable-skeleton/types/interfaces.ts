import type { ColumnInterface, DataTableInterface, LoadingType } from 'nucleify'

export interface NucSkeletonDataTableInterface
  extends Pick<DataTableInterface, 'adType'> {
  rows: []
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
