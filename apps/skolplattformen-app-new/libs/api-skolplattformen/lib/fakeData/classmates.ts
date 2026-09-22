import { Child, Classmate } from '@skolplattformen/api'
import { children } from './children'

export const classmates = (child: Child): Classmate[] =>
  classmatesData.get(child.id) ?? []

const [child1, child2] = children()

const classmatesData = new Map<string, Classmate[]>([
  [
    child1.id,
    [
      {
        sisId: 'd004a-98d965a-45174-d2894ca2-f74ebcb',
        firstname: 'Darion',
        lastname: 'Gustafsson',
        guardians: [
          {
            email: 'Mike_Svensson@example.net',
            firstname: 'Tad',
            lastname: 'Eriksson',
            mobile: '07074791613',
            address: 'Martinvägen 50',
          },
        ],
        className: '2B',
      },
      {
        sisId: '54075-284de06-5664c-750b7b13-520fb61',
        firstname: 'Brock',
        lastname: 'Andersson',
        guardians: [
          {
            email: 'Brad56@example.org',
            firstname: 'Camren',
            lastname: 'Eriksson',
            mobile: '07075129297',
            address: undefined,
          },
        ],
        className: '2B',
      },
      {
        sisId: 'c1fc7-285f95d-c0f37-ea48a297-281e985',
        firstname: 'Eloy',
        lastname: 'Karlsson',
        guardians: [
          {
            email: 'Samara.Larsson@example.net',
            firstname: 'Ike',
            lastname: 'Gustafsson',
            mobile: '07077667407',
            address: undefined,
          },
        ],
        className: '2B',
      },
      {
        sisId: '212e9-8a2609c-b29c1-97a32bd8-5f84645',
        firstname: 'Kristina',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Doug57@example.com',
            firstname: 'Rollin',
            lastname: 'Olsson',
            mobile: '07071720107',
            address: 'Höckertsvägen 2',
          },
        ],
        className: '2B',
      },
      {
        sisId: '01d21-ebc6f8b-526f8-7cfba0ab-26b9956',
        firstname: 'Cydney',
        lastname: 'Larsson',
        guardians: [
          {
            email: 'Davon6@example.org',
            firstname: 'Oleta',
            lastname: 'Svensson',
            mobile: '07079762186',
            address: undefined,
          },
        ],
        className: '2B',
      },
      {
        sisId: 'a45bb-8a481af-0ad12-7bd1fa4c-1eed4b1',
        firstname: 'Berneice',
        lastname: 'Persson',
        guardians: [
          {
            email: 'Milford_Johansson72@example.com',
            firstname: 'Arely',
            lastname: 'Johansson',
            mobile: '07071926019',
            address: 'Roslinvägen 36',
          },
        ],
        className: '2B',
      },
      {
        sisId: '32f31-039fbed-9060b-2d857c46-e47177d',
        firstname: 'Emory',
        lastname: 'Svensson',
        guardians: [
          {
            email: 'Alfredo_Nilsson96@example.org',
            firstname: 'Dolores',
            lastname: 'Andersson',
            mobile: '070752561937',
            address: 'Börjesonsvägen 6',
          },
        ],
        className: '2B',
      },
      {
        sisId: 'c9d0a-28c371d-e7be2-9781386b-6841eb0',
        firstname: 'Maryjane',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Eula_Olsson@example.net',
            firstname: 'Wendy',
            lastname: 'Andersson',
            mobile: '07078513037',
            address: undefined,
          },
          {
            email: 'Lesley_Persson45@example.org',
            firstname: 'Erich',
            lastname: 'Persson',
            mobile: '070788191316',
            address: undefined,
          },
        ],
        className: '2B',
      },
      {
        sisId: 'e0f51-3fbd0be-5a8c3-ded7bbed-1d655d5',
        firstname: 'Rosendo',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Mitchell.Gustafsson84@example.org',
            firstname: 'Mariam',
            lastname: 'Johansson',
            mobile: '07074537423',
            address: 'Molinvägen 29',
          },
          {
            email: 'Rachelle_Olsson@example.net',
            firstname: 'Shaniya',
            lastname: 'Persson',
            mobile: '070765878480',
            address: 'Molinvägen 29',
          },
        ],
        className: '2B',
      },
      {
        sisId: '298c2-46a24d4-548b9-3d1f90ee-4fae0ab',
        firstname: 'Sammy',
        lastname: 'Persson',
        guardians: [
          {
            email: 'Gloria_Svensson@example.com',
            firstname: 'Simeon',
            lastname: 'Olsson',
            mobile: '070753525610',
            address: 'Börjesonsvägen 43',
          },
        ],
        className: '2B',
      },
      {
        sisId: 'e7628-09352ea-b5d19-1af845b7-63b3e08',
        firstname: 'Abraham',
        lastname: 'Svensson',
        guardians: [
          {
            email: 'Erica_Johansson40@example.net',
            firstname: 'Carlotta',
            lastname: 'Nilsson',
            mobile: '070737951712',
            address: 'Aroseniusvägen 27',
          },
          {
            email: 'Malcolm_Gustafsson55@example.org',
            firstname: 'Ramon',
            lastname: 'Persson',
            mobile: '07070395626',
            address: 'Aroseniusvägen 27',
          },
        ],
        className: '2B',
      },
      {
        sisId: 'ae315-4696438-b3db6-8f0a5b39-74e34bd',
        firstname: 'Devante',
        lastname: 'Olsson',
        guardians: [
          {
            email: 'Alf.Johansson39@example.com',
            firstname: 'Schuyler',
            lastname: 'Gustafsson',
            mobile: '07070724289',
            address: undefined,
          },
        ],
        className: '2B',
      },
      {
        sisId: '0d812-350f1d5-323aa-d5d93cdd-406e337',
        firstname: 'Tyrell',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Brennon.Svensson@example.com',
            firstname: 'Belle',
            lastname: 'Nilsson',
            mobile: '07070137347',
            address: undefined,
          },
        ],
        className: '2B',
      },
    ],
  ],
  [
    child2.id,
    [
      {
        sisId: '9ee9e-312233c-0df98-05fa5a65-a3787ec',
        firstname: 'Raphael',
        lastname: 'Olsson',
        guardians: [
          {
            email: 'Johan99@example.com',
            firstname: 'Alessandra',
            lastname: 'Svensson',
            mobile: '070767120463',
            address: 'Franklandsvägen 34',
          },
        ],
        className: '8C',
      },
      {
        sisId: 'd3a4b-16b53de-63c22-56d1ad24-4a64a2d',
        firstname: 'Fanny',
        lastname: 'Karlsson',
        guardians: [
          {
            email: 'Bernadette.Eriksson@example.org',
            firstname: 'Bernadette',
            lastname: 'Karlsson',
            mobile: '070759877956',
            address: undefined,
          },
          {
            email: 'Candice29@example.net',
            firstname: 'Kelley',
            lastname: 'Gustafsson',
            mobile: '070748592035',
            address: undefined,
          },
        ],
        className: '8C',
      },
      {
        sisId: '42bde-8fabd1c-7a00e-28aea88a-8481bac',
        firstname: 'Jamie',
        lastname: 'Persson',
        guardians: [
          {
            email: 'Louisa82@example.net',
            firstname: 'Mose',
            lastname: 'Larsson',
            mobile: '07076548362',
            address: undefined,
          },
        ],
        className: '8C',
      },
      {
        sisId: 'dad49-74308c8-83612-5eb7f3a5-e1c4047',
        firstname: 'Iris',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Vaughn90@example.net',
            firstname: 'Ezra',
            lastname: 'Andersson',
            mobile: '07078700165',
            address: 'Björnsonsgatan 251 D Lgh 1503',
          },
          {
            email: 'Stephany_Svensson22@example.net',
            firstname: 'Mia',
            lastname: 'Larsson',
            mobile: '070761752378',
            address: 'Björnsonsgatan 251 D Lgh 1503',
          },
        ],
        className: '8C',
      },
      {
        sisId: 'b3425-ada6d70-d3acc-a49a12a6-8b3afdc',
        firstname: 'Evans',
        lastname: 'Nilsson',
        guardians: [
          {
            email: 'Terry_Svensson@example.com',
            firstname: 'Christop',
            lastname: 'Olsson',
            mobile: '070767660094',
            address: undefined,
          },
          {
            email: 'Johanna_Svensson30@example.org',
            firstname: 'Madisen',
            lastname: 'Johansson',
            mobile: '07072269029',
            address: undefined,
          },
        ],
        className: '8C',
      },
      {
        sisId: '67471-6c03979-9ef6e-bb2827c4-96d00d5',
        firstname: 'Evy',
        lastname: 'Larsson',
        guardians: [
          {
            email: 'Serenity.Gustafsson@example.net',
            firstname: 'Toni',
            lastname: 'Larsson',
            mobile: '07075211567',
            address: 'Roslinvägen 48',
          },
        ],
        className: '8C',
      },
      {
        sisId: 'f4040-516c4ed-34555-fd525183-6a2f666',
        firstname: 'Maximillia',
        lastname: 'Karlsson',
        guardians: [
          {
            email: 'Faustino.Andersson@example.com',
            firstname: 'Eriberto',
            lastname: 'Nilsson',
            mobile: '07076024039',
            address: 'Beckombergavägen 213 Lgh 1304',
          },
        ],
        className: '8C',
      },
      {
        sisId: 'a9494-75d8ca7-a5fd4-977eca3c-40edbc1',
        firstname: 'Pia',
        lastname: 'Karlsson',
        guardians: [
          {
            email: 'Arthur.Karlsson4@example.org',
            firstname: 'Eldred',
            lastname: 'Svensson',
            mobile: '07077609534',
            address: 'Börjesonsvägen 6',
          },
        ],
        className: '8C',
      },
      {
        sisId: '42a6d-3eaf407-fed01-4a9538de-b822503',
        firstname: 'Logan',
        lastname: 'Larsson',
        guardians: [
          {
            email: 'Blake4@example.org',
            firstname: 'Jan',
            lastname: 'Karlsson',
            mobile: '070728715653',
            address: 'Bällstavägen 162',
          },
        ],
        className: '8C',
      },
      {
        sisId: '9077d-c323c8d-d0d29-5690abfb-d348317',
        firstname: 'Torun',
        lastname: 'Eriksson',
        guardians: [
          {
            email: 'Blanca98@example.net',
            firstname: 'Dallin',
            lastname: 'Eriksson',
            mobile: '070766214425',
            address: 'Molinvägen 1',
          },
        ],
        className: '8C',
      },
      {
        sisId: '31c68-5b86667-0701d-6b7e2471-89e6df9',
        firstname: 'Izabella',
        lastname: 'Johansson',
        guardians: [
          {
            email: 'Elouise_Johansson25@example.org',
            firstname: 'Jerrold',
            lastname: 'Nilsson',
            mobile: '07073789274',
            address: 'Stobaeusvägen 11',
          },
        ],
        className: '8C',
      },
      {
        sisId: '1bb69-5f1c3a6-f0ea8-e1dbb608-2756a52',
        firstname: 'Ella',
        lastname: 'Persson',
        guardians: [
          {
            email: 'Shayna.Olsson54@example.net',
            firstname: 'Onie',
            lastname: 'Nilsson',
            mobile: '07076957797',
            address: undefined,
          },
        ],
        className: '8C',
      },
      {
        sisId: '348a7-2d0eccc-02981-a02ccb03-cb2a8f2',
        firstname: 'Jaylen',
        lastname: 'Larsson',
        guardians: [
          {
            email: 'Aileen_Andersson@example.net',
            firstname: 'Tess',
            lastname: 'Karlsson',
            mobile: '070715315590',
            address: 'Peringskiöldsvägen 64',
          },
        ],
        className: '8C',
      },
    ],
  ],
])
