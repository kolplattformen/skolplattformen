type Neutral =
  | 'white'
  | 'black'
  | 'gray200'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
export const neutral: Record<Neutral, string> = {
  white: '#ffffff',
  gray200: '#E5E7EB',
  gray500: '#6B7280', // 4.83 (AA) on white
  gray600: '#4B5563', // 7.56 (AAA) on white
  gray700: '#374151', // 10.31 (AAA) on white
  gray800: '#1F2937', // 14.68 (AAA) on white
  black: '#000000', // 21 (AAA) on white
}

type Primary = 'primary600'
export const primary: Record<Primary, string> = {
  primary600: '#DB2575',
}
