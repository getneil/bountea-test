import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PackageType } from '../types/index'
import { FaLeaf } from 'react-icons/fa'

interface BounteaProps {
  amount?: number
  active: boolean
}

export const testId = 'bountea'

export default function Bountea({ amount, active }: BounteaProps) {
  return (
    <div
      data-testid={testId}
      className="w-16 flex flex-col justify-center align-middle items-center"
    >
      <h1 className="text-2xl text-green-700">{active ? amount || 0 : ''}</h1>
      <FaLeaf style={{ color: active ? 'green' : 'gray' }} size="1.5em" />
    </div>
  )
}
