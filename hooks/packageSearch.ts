import { useState, useEffect, useMemo } from 'react'
import similarity from 'string-similarity'
import { PackageType } from '../types/index'
import { createPackageDictionary } from '../lib/db'

const searchThreshold = process.env.NEXT_PUBLIC_SEARCH_THRESHOLD || 0.07

export default function usePackageSearch(
  search: string,
  packages: PackageType[]
): { result: PackageType[] } {
  const [result, setResult] = useState<PackageType[]>([])
  const dictionary = createPackageDictionary(packages)

  useEffect(() => {
    // TODO: replace this with algolia this is not safe
    // trusting the debounce for now in SearchInput hahaha
    const packageSearchStrings = packages.map((p) => {
      return `${p.slug}::: ${p.name} ${p.full_name} ${p.desc}`
    })
    const { ratings } = similarity.findBestMatch(search, packageSearchStrings)
    const sortedRatings: string[] = ratings
      .filter(({ rating }) => rating > searchThreshold)
      .sort((a, b) => b.rating - a.rating)
      .map(({ target }) => target.split(':::')[0])

    const filteredPackages = sortedRatings.map((slug) => dictionary[slug])
    setResult(filteredPackages)
  }, [search])

  return {
    result,
  }
}
