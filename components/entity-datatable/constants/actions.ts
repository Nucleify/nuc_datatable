import type { ActionType, OpenDialogFunctionType } from 'nucleify'

export const actions = (openDialog: OpenDialogFunctionType) => {
  const actionData: readonly [string, ActionType][] = [
    ['prime:eye', 'show'],
    ['prime:pencil', 'edit'],
    ['prime:trash', 'delete'],
  ] as const

  return actionData.map(([icon, action]) => ({
    icon,
    click: (data: Record<string, unknown>) => openDialog(action, data),
  }))
}
