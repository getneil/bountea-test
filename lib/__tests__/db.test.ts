import { createPackageDictionary, getPackageBySlug } from '../db'
import mockData from '../__mocks__/mockData.json'
import { PackageType } from '../../types/index'
jest.mock('../db.json', () => require('../__mocks__/mockData.json'))

describe('db lib', () => {
  beforeAll(() => {
    jest.unmock('../db')
  })
  it('should create package dictionary', () => {
    const manualDict: { [key: string]: PackageType } = {
      'leesavide/abcm2ps': {
        name: 'abcm2ps',
        full_name: 'abcm2ps',
        homepage: 'http://moinejf.free.fr',
        desc: 'ABC music notation software',
        version: '8.14.13',
        slug: 'leesavide/abcm2ps',
        github_repo_url: 'https://github.com/leesavide/abcm2ps',
        github_repo_api_url: 'https://github.com/repos/leesavide/abcm2ps',
        is_bountea_registered: false,
        bountea: 0,
      },
      'martanne/abduco': {
        name: 'abduco',
        full_name: 'abduco',
        homepage: 'https://www.brain-dump.org/projects/abduco',
        desc: 'Provides session management: i.e. separate programs from terminals',
        version: '0.6',
        slug: 'martanne/abduco',
        github_repo_url: 'https://github.com/martanne/abduco',
        github_repo_api_url: 'https://github.com/repos/martanne/abduco',
        is_bountea_registered: false,
        bountea: 0,
      },
      'lvc/abi-compliance-checker': {
        name: 'abi-compliance-checker',
        full_name: 'abi-compliance-checker',
        homepage: 'https://lvc.github.io/abi-compliance-checker/',
        desc: 'Tool for checking backward API/ABI compatibility of a C/C++ library',
        version: '2.3',
        slug: 'lvc/abi-compliance-checker',
        github_repo_url: 'https://github.com/lvc/abi-compliance-checker',
        github_repo_api_url:
          'https://github.com/repos/lvc/abi-compliance-checker',
        is_bountea_registered: false,
        bountea: 0,
      },
    }

    const dictionary = createPackageDictionary(mockData)

    expect(dictionary).toEqual(manualDict)
  })
  it('should return a specific package', () => {
    const pkg = mockData[0]
    const result = getPackageBySlug(pkg.slug)
    expect(result).toEqual(pkg)
  })
})
