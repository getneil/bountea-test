import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PackageType } from '../types/index'

interface PackageProps {
  value: PackageType
}

export const testId = 'package'

// note: cant use `package` its a reserved word
export default function Package({ value }: PackageProps) {
  return <div data-testid={testId}>{value.name}</div>
}
