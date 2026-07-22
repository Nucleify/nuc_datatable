import type { NucEntityDatatableInterface } from 'nucleify'

export interface NucEntityDatatableCardInterface
  extends NucEntityDatatableInterface {
  headerText?: string
  buttonText?: string
  tag?: number
}
