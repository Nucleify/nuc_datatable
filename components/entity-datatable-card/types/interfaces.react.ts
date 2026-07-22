import type { HeadingInterface, NucEntityDatatableInterface } from 'nucleify'

export interface NucEntityDatatableCardInterface
  extends NucEntityDatatableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
