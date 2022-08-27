import db from './db.json'
import { PackageType } from '../types'
export function getFormulas(): PackageType[] {
  return db as PackageType[]
}