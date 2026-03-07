import type { OpenDialogFunctionType } from 'nucleify'

export const actions = (
  openDialog: OpenDialogFunctionType
): readonly ActionInterface[] => {
  const actionData: readonly [string, ActionType][] = [
    ['prime:eye', 'show'],
    ['prime:pencil', 'edit'],
    ['prime:trash', 'delete'],
  ] as const

  return actionData.map(
    ([icon, action]): ActionInterface => ({
      icon,
      click: (data: ObjectType) => openDialog(action, data),
    })
  )
}
