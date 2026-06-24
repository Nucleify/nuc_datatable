'use client'

import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import type {
  DataTableFilterEvent,
  DataTableFilterMeta,
  DataTableRowClickEvent,
} from 'primereact/datatable'
import { Menu } from 'primereact/menu'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import type { ColumnInterface, NucEntityDatatableInterface } from 'nucleify'
import {
  AdButton,
  AdDataTable,
  AdInputText,
  AdMenu,
  actions as actionsList,
  columns,
  NucEntityDataTableSkeleton,
  NucShareCheckbox,
  type OpenDialogFunctionType,
  useMenu,
  useSelect,
  useShareSelection,
} from 'nucleify'

import './_index.scss'

type TableRowData = Record<string, unknown> & { id: number }
type ShareTableRow = TableRowData & { __shareChecked: boolean }

const toRowData = (row: ShareTableRow): TableRowData => {
  const { __shareChecked: _checked, ...data } = row
  return data as TableRowData
}

interface ActionItem {
  icon: string
  click: (data: TableRowData) => void
}

interface NucEntityDataTableProps extends NucEntityDatatableInterface {
  onFiltersUpdate?: (filters: DataTableFilterMeta) => void
  onSelectedUpdate?: (selected: unknown[]) => void
}

export const NucEntityDataTable: React.FC<NucEntityDataTableProps> = (
  props
) => {
  const { t } = useTranslation()

  const {
    adType,
    value,
    openDialog,
    enableShare,
    filters,
    rows = 10,
    loading,
    onFiltersUpdate,
    onSelectedUpdate,
    selection: _selection,

    actions: propsActions,
    selectedObject: propsSelectedObject,

    ...restProps
  } = props

  const menuRef = useRef<Menu>(null)

  const fallbackOpenDialog: OpenDialogFunctionType = useCallback(
    () => undefined,
    []
  )
  const resolvedOpenDialog = useMemo<OpenDialogFunctionType>(
    () => openDialog ?? fallbackOpenDialog,
    [openDialog, fallbackOpenDialog]
  )

  const actions = useMemo(
    () => actionsList(resolvedOpenDialog),
    [resolvedOpenDialog]
  )

  const { openMenu, selectedObject } = useMenu()

  const { selectItems } = useSelect(selectedObject, resolvedOpenDialog)

  const specificColumns = useMemo<readonly ColumnInterface[]>(() => {
    return columns[adType as keyof typeof columns] || []
  }, [adType])

  const skeletonRows = useMemo(() => Array.from({ length: rows }), [rows])

  const items = (value as TableRowData[]) || undefined

  const {
    selected,
    isAllSelected,
    isIndeterminate,
    toggle,
    toggleAll,
    getSelectedItems,
  } = useShareSelection(items)

  // PrimeReact nie re-renderuje body kolumny przy zmianie zewnętrznego stanu
  // (w przeciwieństwie do reaktywnego slotu w PrimeVue). Wpinamy zaznaczenie w value.
  const tableRows = useMemo<ShareTableRow[]>(() => {
    if (!items?.length) return []

    return items.map((item) => ({
      ...item,
      __shareChecked: selected[item.id] === true,
    }))
  }, [items, selected])

  useEffect(() => {
    onSelectedUpdate?.(getSelectedItems<TableRowData>())
  }, [selected, onSelectedUpdate, getSelectedItems])

  const shareHeaderTemplate = () => (
    <NucShareCheckbox
      key={`share-all-${isAllSelected}-${isIndeterminate}`}
      adType={adType as AdTypeType}
      checked={isAllSelected}
      indeterminate={isIndeterminate}
      isAll
      onToggle={toggleAll}
    />
  )

  const shareBodyTemplate = (rowData: ShareTableRow) => (
    <NucShareCheckbox
      adType={adType as AdTypeType}
      checked={rowData.__shareChecked}
      onToggle={() => toggle(rowData.id)}
    />
  )

  const filterTemplate = (
    options: ColumnFilterElementTemplateOptions,
    colHeader: string
  ) => (
    <AdInputText
      className="entity-datatable-filter-input"
      adType={adType}
      value={(options.value as string) || ''}
      placeholder={t('column-search-placeholder', { column: t(colHeader) })}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
    />
  )

  const actionBodyTemplate = (rowData: ShareTableRow) => (
    <div className="action-column-content">
      {adType === 'activity' ? (
        <AdButton
          adType={adType as AdTypeType}
          variant="data-table"
          icon="prime:trash"
          rounded
          text
          loading={!!loading}
          onClick={(event) => {
            event.stopPropagation()
            openDialog?.('delete', toRowData(rowData))
          }}
        />
      ) : (
        <>
          {actions.map((action: ActionItem) => (
            <AdButton
              key={action.icon}
              adType={adType as AdTypeType}
              media="desktop"
              variant="data-table"
              icon={action.icon}
              rounded
              text
              loading={!!loading}
              onClick={(event) => {
                event.stopPropagation()
                action.click(toRowData(rowData))
              }}
            />
          ))}
          <AdButton
            adType={adType as AdTypeType}
            media="mobile"
            variant="data-table"
            icon="prime:bars"
            rounded
            text
            loading={!!loading}
            onClick={(event) => {
              event.stopPropagation()
              openMenu(menuRef.current, event, toRowData(rowData))
            }}
          />
          <AdMenu ref={menuRef} model={selectItems} />
        </>
      )}
    </div>
  )

  return (
    <>
      {!loading ? (
        <AdDataTable
          adType={adType}
          className="entity-datatable"
          dataKey="id"
          value={tableRows}
          rows={rows}
          paginator={restProps.paginator ?? true}
          filters={filters as DataTableFilterMeta}
          onFilter={(e: DataTableFilterEvent) => onFiltersUpdate?.(e.filters)}
          onRowClick={(e: DataTableRowClickEvent) =>
            openDialog?.('show', toRowData(e.data as ShareTableRow))
          }
          {...restProps}
          stripedRows={false}
          rowHover={false}
        >
          {enableShare && (
            <Column
              className="share-checkbox-column"
              headerClassName="share-checkbox-column"
              header={shareHeaderTemplate}
              body={shareBodyTemplate}
            />
          )}

          {specificColumns.map((col, index) => (
            <Column
              key={col.field ?? `${adType}-col-${index}`}
              field={col.field}
              header={t(col.header ?? '')}
              className={col.class}
              headerClassName={col.class}
              sortable={col.sortable}
              filter
              filterMatchMode="contains"
              filterElement={(options) =>
                filterTemplate(options, col.header ?? '')
              }
            />
          ))}

          <Column
            className="action-column"
            headerClassName="action-column"
            body={actionBodyTemplate}
          />
        </AdDataTable>
      ) : null}

      <NucEntityDataTableSkeleton
        adType={adType as string}
        enableShare={enableShare}
        rows={skeletonRows}
        loading={loading ?? false}
        specificColumns={[...specificColumns]}
      />
    </>
  )
}
