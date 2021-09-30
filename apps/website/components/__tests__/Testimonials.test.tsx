import React from 'react'
import { render, screen } from '../../utils/test-utils'
import Testimonials, { testimonials } from '../Testimonials'

const setup = (customProps = {}) => {
  const props = {
    ...customProps,
  }

  return render(<Testimonials {...props} />)
}

test.each([testimonials.flatMap((testimonial) => Object.values(testimonial))])(
  'displays all testimonials',
  (_image, text, name, title) => {
    setup()

    expect(screen.getByAltText(name)).toBeInTheDocument()
    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
  }
)
