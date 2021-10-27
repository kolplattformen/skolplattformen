import { merge } from './childlists'

describe('childlists', () => {
  describe('merge', () => {
    it('works with empty skola24children list', () => {
      const etjanstChildren = [
        { name: 'Uwe Übrink (elev)' },
        { name: 'Cassius Übrink (elev)' },
      ]
      const skola24Children = []

      const children = [
        { name: 'Uwe Übrink (elev)' },
        { name: 'Cassius Übrink (elev)' },
      ]
      expect(merge(etjanstChildren, skola24Children)).toEqual(children)
    })
    it('works with same length skola24children list', () => {
      const etjanstChildren = [
        { name: 'Uwe Übrink (elev)' },
        { name: 'Cassius Übrink (elev)' },
      ]
      const skola24Children = [
        { firstName: 'Uwe', lastName: 'Vredstein Übrink' },
        { firstName: 'Cassius', lastName: 'Vredstein Übrink' },
      ]

      const children = [
        {
          name: 'Uwe Übrink (elev)',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
        {
          name: 'Cassius Übrink (elev)',
          firstName: 'Cassius',
          lastName: 'Vredstein Übrink',
        },
      ]
      expect(merge(etjanstChildren, skola24Children)).toEqual(children)
    })
    it('works with different length skola24children list', () => {
      const etjanstChildren = [
        { name: 'Uwe Übrink (elev)' },
        { name: 'Cassius Übrink (elev)' },
      ]
      const skola24Children = [
        { firstName: 'Uwe', lastName: 'Vredstein Übrink' },
      ]

      const children = [
        {
          name: 'Uwe Übrink (elev)',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
        { name: 'Cassius Übrink (elev)' },
      ]
      expect(merge(etjanstChildren, skola24Children)).toEqual(children)
    })
    it('works with non matching skola24children list', () => {
      const etjanstChildren = [
        { name: 'Uwe Übrink (elev)' },
        { name: 'Cassius Übrink (elev)' },
      ]
      const skola24Children = [
        { firstName: 'Uwe', lastName: 'Vredstein Übrink' },
        { firstName: 'Rolph', lastName: 'Gögendorff Bröök' },
      ]

      const children = [
        {
          name: 'Uwe Übrink (elev)',
          firstName: 'Uwe',
          lastName: 'Vredstein Übrink',
        },
        { name: 'Cassius Übrink (elev)' },
      ]
      expect(merge(etjanstChildren, skola24Children)).toEqual(children)
    })
  })
})
