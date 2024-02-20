declare module 'libraries.json' {
  export interface Library {
    libraryName: string
    version: string
    _license?: License | string
    _description?: string
    homepage?: string
    author?: Author | string
    repository?: Repository
    _licenseContent?: string
  }

  export interface License {
    type: string
    url: string
  }

  export interface Author {
    name: string
    url?: string
    email?: string
  }

  export interface Repository {
    type?: string
    url: string
    directory?: string
    baseUrl?: string
    web?: string
    dist?: string
  }

  const libraries: Library[]

  export default libraries
}
