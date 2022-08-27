import { getFormulas } from '../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PackageType } from '../../types'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PackageType[]>
) {
  const formulas = getFormulas()
  res.status(200).json(formulas)
}
