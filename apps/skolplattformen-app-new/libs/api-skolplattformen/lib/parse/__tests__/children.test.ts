import { EtjanstResponse } from '../'
import { children } from '../children'

let response: EtjanstResponse

beforeEach(() => {
  response = {
    Success: true,
    Error: null,
    Data: [
      {
        Name: 'Some name',
        Id: '42C3997E-D772-423F-9290-6FEEB3CB2DA7',
        SDSId: '786E3393-F044-4660-9105-B444DEB289AA',
        Status: 'GR',
        UserType: 'Student',
        SchoolId: 'DE2E1293-0F40-4B91-9D91-1E99355DC257',
        SchoolName: null,
        GroupId: null,
        GroupName: null,
        Classes:
          'VHsidan_0495CABC-77DB-41D7-824B-8B4D63E50D15;Section_AD1BB3B2-C1EE-4DFE-8209-CB6D42CE23D7;Section_0E67D0BF-594C-4C1B-9291-E753926DCD40;VHsidan_1C94EC54-9798-401C-B973-2454246D95DA',
        isSameSDSId: false,
        ResultUnitId: null,
        ResultUnitName: null,
        UnitId: null,
        UnitName: null,
      },
    ],
  }
})

it('parses children correctly', () => {
  expect(children(response)).toEqual([
    {
      name: 'Some name',
      id: '42C3997E-D772-423F-9290-6FEEB3CB2DA7',
      sdsId: '786E3393-F044-4660-9105-B444DEB289AA',
      schoolId: 'DE2E1293-0F40-4B91-9D91-1E99355DC257',
      status: 'GR',
    },
  ])
})
