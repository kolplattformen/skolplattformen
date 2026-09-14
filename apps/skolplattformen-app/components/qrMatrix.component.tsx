/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useMemo } from 'react'
import Svg, { Rect } from 'react-native-svg'

// Ren JS-QR-generator från qrcode-terminalens vendor (fungerar i Hermes)
const QRCodeMatrix = require('qrcode-terminal/vendor/QRCode')
const QRErrorCorrectLevel = require('qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel')

const getMatrix = (text: string): boolean[][] => {
  const qr = new QRCodeMatrix(-1, QRErrorCorrectLevel.L)
  qr.addData(text)
  qr.make()
  const count = qr.getModuleCount()
  const matrix: boolean[][] = []
  for (let row = 0; row < count; row++) {
    const line: boolean[] = []
    for (let col = 0; col < count; col++) line.push(qr.isDark(row, col))
    matrix.push(line)
  }
  return matrix
}

interface QrMatrixProps {
  value: string
  size?: number
}

export const QrMatrix = ({ value, size = 280 }: QrMatrixProps) => {
  const matrix = useMemo(() => {
    try {
      return getMatrix(value)
    } catch {
      return null
    }
  }, [value])

  if (!matrix) return null

  const count = matrix.length
  const pad = 2
  const total = count + pad * 2
  const cell = size / total

  const rects: React.ReactElement[] = []
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (matrix[r][c]) {
        rects.push(
          <Rect
            key={`${r}-${c}`}
            x={(pad + c) * cell}
            y={(pad + r) * cell}
            width={cell + 0.5}
            height={cell + 0.5}
            fill="#000"
          />
        )
      }
    }
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect x={0} y={0} width={size} height={size} fill="#fff" />
      {rects}
    </Svg>
  )
}
