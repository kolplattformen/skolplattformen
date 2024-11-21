import { EtjanstResponse } from '../'
import { menu, menuList } from '../menu'

let response: EtjanstResponse

describe('menu', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: [
        {
          Title: 'Måndag - Vecka 52',
          Description: 'Körrfärsrätt .<br/>Veg färs',
        },
      ],
    }
  })
  it(' menu correctly', () => {
    expect(menu(response)).toEqual([
      {
        title: 'Måndag - Vecka 52',
        description: 'Körrfärsrätt .\nVeg färs',
      },
    ])
  })
})

describe('menu-list', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: {
        SelectedWeek: 12,
        Menus: [
          {
            Week: '12',
            Mon: 'Köttfärslimpa med sås och potatis',
            Tue: 'Curryfisk med ris',
            Wed: 'Tagliatelle med vegetarisk sås',
            Thu: 'Chorizo med stuvad potatis',
            Fri: 'Ört och vitlöksinbakad fisk, potatis',
          },
          {
            Week: '19',
            Mon: 'FISKGRATÄNG WALEWSKA',
            Tue: 'STEKT FLÄSK MED RAGGMUNK',
            Wed: 'PENNEPASTA MED TONFISK',
            Thu: 'KÖTTGRYTA MED POTATIS',
            Fri: 'GRÖNSAKSGRATÄNG MED TZATZIKI',
          },
          {
            Week: '20',
            Mon: 'SPAGHETTI SALMONE ',
            Tue: 'STEKT FALUKORV MED SENAPSSÅS OCH POTATIS',
            Wed: 'SOPPA MED RISONI OCH HEMBAKAT BRÖD',
            Thu: 'PANERAD FISK MED SKAGEN OCH POTATIS',
            Fri: 'TACOS',
          },
        ],
      },
    }
  })
  it(' menu correctly', () => {
    const result = menuList(response)

    expect(result).toEqual([
      {
        title: 'Måndag - Vecka 12',
        description: 'Köttfärslimpa med sås och potatis',
      },
      {
        title: 'Tisdag - Vecka 12',
        description: 'Curryfisk med ris',
      },
      {
        title: 'Onsdag - Vecka 12',
        description: 'Tagliatelle med vegetarisk sås',
      },
      {
        title: 'Torsdag - Vecka 12',
        description: 'Chorizo med stuvad potatis',
      },
      {
        title: 'Fredag - Vecka 12',
        description: 'Ört och vitlöksinbakad fisk, potatis',
      },
    ])
  })
})
