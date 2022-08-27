import axios from 'axios'
import _ from 'lodash'
import fs from 'fs'
import { PackageType } from '../types'
/**
 * TODO:
 * get https://formulae.brew.sh/api/formula.json
 * filter by github
 * reshape into what is necessary deets only
 *  * add random bountea number
 * save to json file? in lib?
 *  should commit or not? NOPE 
 */
const formulaListUrl = 'https://formulae.brew.sh/api/formula.json'
async function main() {
  const { data: formulas } = await axios.get(formulaListUrl)
  const formulasWithGithubUrls = formulas.filter(filterWithGithub)
  const dbData: PackageType[] = formulasWithGithubUrls.map(getPackageShape)
  await fs.writeFileSync('./lib/db.json', JSON.stringify(dbData, null, 2), 'utf8')
  console.log('database has been created! packages:', dbData.length)
}

const filterWithGithub = (formula: any): any => {
  const gh = 'github.com'
  const stableUrl = _.get(formula, 'urls.stable.url', '')
  const homePage = formula.homepage
  const hasGithub = stableUrl.includes(gh) || formula?.homepage.includes(gh)
  return hasGithub
}

const getPackageShape = (formula: any): PackageType => {
  const gitHubRawUrl = (formula.homepage.includes('github.com') ?
    formula.homepage:
    _.get(formula, 'urls.stable.url', '')).split('/').slice(0,5).join('/');
  
  const slug = gitHubRawUrl.split('/').slice(3,5).join('/')

  const isRegistered = _.random(0, 100) < 60

  return {
    ..._.pick(formula, [
      'name',
      'full_name',
      'homepage',
      'desc'
    ]),
    slug,
    github_repo_url: gitHubRawUrl,
    github_repo_api_url: gitHubRawUrl.replace('.com/','.com/repos/'),
    is_bountea_registered: isRegistered,
    bountea: isRegistered ? _.random(30, 256) : 0
  } as PackageType
}

main()