import type { ColumnInterface } from 'nucleify'

const createColumn = (
  field: string,
  header: string,
  className: string
): ColumnInterface => ({
  field,
  header,
  class: className,
})

const columnsData: Record<string, readonly [string, string, string][]> = {
  activity: [
    ['id', 'column-id', 'id-activity-column'],
    ['description', 'column-description', 'description-column'],
    ['created_at', 'column-created-at', 'created-at-activity-column'],
  ],
  article: [
    ['title', 'column-title', 'title-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  card: [
    ['title', 'column-title', 'title-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  contact: [
    ['full_name', 'column-full-name', 'full-name-column'],
    ['email', 'column-email', 'email-column tablet-column'],
    ['birthday', 'column-birthday', 'birthday-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  feature: [
    ['header', 'column-header', 'header-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  file: [
    ['path', 'column-path', 'path-column'],
    ['mime_type', 'column-mime-type', 'mime-type-column'],
    ['size', 'column-size', 'size-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  money: [
    ['title', 'column-title', 'title-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  user: [
    ['name', 'column-name', 'name-column'],
    ['email', 'column-email', 'email-column'],
    ['role', 'column-role', 'role-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  question: [
    ['content', 'column-content', 'content-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  task: [
    ['title', 'column-title', 'title-column'],
    ['description', 'column-description', 'description-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  technology: [
    ['label', 'column-label', 'label-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
  link: [
    ['src', 'column-src', 'src-column'],
    ['category', 'column-category', 'category-column desktop-column'],
    ['created_at', 'column-created-at', 'created-at-column'],
    ['updated_at', 'column-updated-at', 'updated-at-column'],
  ],
} as const

export const columns: Record<string, readonly ColumnInterface[]> =
  Object.fromEntries(
    Object.entries(columnsData).map(
      ([key, data]): [string, readonly ColumnInterface[]] => [
        key,
        data.map(([field, header, className]) =>
          createColumn(field, header, className)
        ),
      ]
    )
  )
