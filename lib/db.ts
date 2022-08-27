import db from './db.json'
import { PackageType } from '../types'

interface PackageDictionary {
  [key: string]: PackageType
}

export function createPackageDictionary(packages: PackageType[]): {
  [slug: string]: PackageType
} {
  const dictionary: PackageDictionary = {}
  for (const p of packages) {
    dictionary[p.slug] = p
  }
  return dictionary
}

const packageDictionary = createPackageDictionary(db as PackageType[])

export function getPackages(): PackageType[] {
  return db as PackageType[]
}

export function getPackageBySlug(slug: string): PackageType | null {
  return packageDictionary[slug] || null
}
