export interface ActionInterface {
  icon: string
  click: (data: Record<string, unknown> | undefined) => void
}
