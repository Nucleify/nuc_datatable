import { Column } from 'primereact/column'
import { Skeleton } from 'primereact/skeleton'
import React from 'react'

import type { NucSkeletonDataTableInterface } from 'nucleify'
import { AdDataTable } from 'nucleify'

export const NucEntityDataTableSkeleton: React.FC<
  NucSkeletonDataTableInterface
> = ({ nuiType, loading, rows, enableShare, specificColumns }) => {
  if (!loading) return null
  const tableRows = rows.map((_, index) => ({ id: index }))

  const shareHeaderTemplate = () => <Skeleton width="24px" height="24px" />
  const shareBodyTemplate = () => <Skeleton width="24px" height="24px" />

  const dynamicHeaderTemplate = () => <Skeleton width="100%" height="22px" />
  const dynamicFilterTemplate = () => <Skeleton width="100%" height="22px" />
  const dynamicBodyTemplate = () => <Skeleton height="34px" />

  const actionBodyTemplate = () => (
    <div className="action-column-content">
      {[1, 2, 3].map((index) => (
        <Skeleton
          key={index}
          className="desktop"
          shape="circle"
          width="34px"
          height="34px"
        />
      ))}

      <Skeleton className="mobile" shape="circle" width="34px" height="34px" />
    </div>
  )

  return (
    <AdDataTable
      nuiType={nuiType as ObjectNameType}
      value={tableRows}
      size="small"
      filterDisplay="row"
      className="entity-datatable skeleton-data-table"
    >
      {enableShare && (
        <Column
          className="share-checkbox-column"
          headerClassName="share-checkbox-column"
          header={shareHeaderTemplate}
          body={shareBodyTemplate}
        />
      )}

      {specificColumns?.map((col, index) => (
        <Column
          key={index}
          className={col.class}
          headerClassName={col.class}
          header={dynamicHeaderTemplate}
          filter
          filterElement={dynamicFilterTemplate}
          showFilterMenu={false}
          body={dynamicBodyTemplate}
        />
      ))}

      <Column
        className="action-column"
        headerClassName="action-column"
        body={actionBodyTemplate}
      />
    </AdDataTable>
  )
}
