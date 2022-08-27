import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '@/pages/index'
import { getPackages } from '../lib/db'

import Package, { testId as pkgTestId } from '../components/Package'

jest.mock('../lib/db')

describe('Home', () => {
  it('should list 3 packages', () => {
    const packages = getPackages()
    render(<Home packages={packages} />)

    const packagesRendered = screen.getAllByTestId(pkgTestId)

    expect(packagesRendered).toHaveLength(3)
  })
  afterAll(() => {
    jest.unmock('../lib/db')
  })
})
