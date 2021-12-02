import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle'
import { Theme } from '../themes/default'
import { Box } from './Box'

export const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: 'cardVariants' })], Box)
