describe('diag', () => {
  it('kollar globals', () => {
    console.log('DIAG FormData:', typeof FormData)
    console.log('DIAG global**: ', typeof global, Object.keys(global).length)
    console.log('DIAG __TSETUP_RAN__:', (global as any).__TSETUP_RAN__)
  })
})
