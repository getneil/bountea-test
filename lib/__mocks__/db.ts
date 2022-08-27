import { PackageType } from '../types'
import mockData from './mockData.json'

export function getPackages(): PackageType[] {
  return mockData as PackageType[]
}

export function createPackageDictionary(packages: PackageType[]) {
  const mockDictionary = {}
  return mockDictionary
}
