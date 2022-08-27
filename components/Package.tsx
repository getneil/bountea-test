import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PackageType } from '../types/index'
import Bountea from './Bountea'
interface PackageProps {
  value: PackageType
}

export const testId = 'package'

// note: cant use `package` its a reserved word
export default function Package({ value }: PackageProps) {
  return (
    <Link data-testid={testId} href={`/${value.slug}`}>
      <div className="cursor-pointer card card-side bg-base-100 shadow-xl">
        <figure>
          <Bountea
            active={value.is_bountea_registered}
            amount={value.bountea}
          />
        </figure>
        <div className="card-body overflow-hidden">
          <header className="flex flex-column md:flex-row justify-between">
            <h2 className="card-title">{value.name}</h2>
            <h3>v {value.version}</h3>
          </header>
          <p className="truncate">{value.desc}</p>
        </div>
      </div>
    </Link>
  )
}
