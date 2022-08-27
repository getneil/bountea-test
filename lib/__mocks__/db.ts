import { PackageType } from '../types'

const mockData: PackageType[] = [
  {
    name: 'abcm2ps',
    full_name: 'abcm2ps',
    homepage: 'http://moinejf.free.fr',
    desc: 'ABC music notation software',
    slug: 'leesavide/abcm2ps',
    github_repo_url: 'https://github.com/leesavide/abcm2ps',
    github_repo_api_url: 'https://github.com/repos/leesavide/abcm2ps',
    is_bountea_registered: true,
    bountea: 62,
  },
  {
    name: 'abduco',
    full_name: 'abduco',
    homepage: 'https://www.brain-dump.org/projects/abduco',
    desc: 'Provides session management: i.e. separate programs from terminals',
    slug: 'martanne/abduco',
    github_repo_url: 'https://github.com/martanne/abduco',
    github_repo_api_url: 'https://github.com/repos/martanne/abduco',
    is_bountea_registered: true,
    bountea: 227,
  },
  {
    name: 'abi-compliance-checker',
    full_name: 'abi-compliance-checker',
    homepage: 'https://lvc.github.io/abi-compliance-checker/',
    desc: 'Tool for checking backward API/ABI compatibility of a C/C++ library',
    slug: 'lvc/abi-compliance-checker',
    github_repo_url: 'https://github.com/lvc/abi-compliance-checker',
    github_repo_api_url: 'https://github.com/repos/lvc/abi-compliance-checker',
    is_bountea_registered: true,
    bountea: 142,
  },
]

export function getFormulas(): PackageType[] {
  return mockData as PackageType[]
}
