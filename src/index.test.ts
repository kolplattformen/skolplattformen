import parse from './'

describe('parse', () => {
  it('Diverse', () => {
    expect(parse('Lunch')).toEqual({
      code: 'Lunch',
      category: 'Diverse',
      name: 'Lunch',
    })
    expect(parse('Prandium')).toEqual({
      code: 'Prandium',
      category: 'Diverse',
      name: 'Lunch',
    })
    expect(parse('MTID')).toEqual({
      code: 'MTID',
      category: 'Diverse',
      name: 'Mentorstid',
    })
  })
  it('Ämnesområden', () => {
    expect(parse('BL')).toEqual({ code: 'BL', category: '', name: 'Bild' })
    expect(parse('EN')).toEqual({ code: 'EN', category: '', name: 'Engelska' })
    expect(parse('HKK')).toEqual({
      code: 'HKK',
      category: '',
      name: 'Hem & Konsumentkunskap',
    })
    expect(parse('IDH')).toEqual({
      code: 'IDH',
      category: '',
      name: 'Idrott & Hälsa',
    })
    expect(parse('MA')).toEqual({ code: 'MA', category: '', name: 'Matematik' })
    expect(parse('MU')).toEqual({ code: 'MU', category: '', name: 'Musik' })
    expect(parse('NO')).toEqual({
      code: 'NO',
      category: '',
      name: 'Naturorienterande ämnen',
    })
    expect(parse('BI')).toEqual({ code: 'BI', category: '', name: 'Biologi' })
    expect(parse('FY')).toEqual({ code: 'FY', category: '', name: 'Fysik' })
    expect(parse('KE')).toEqual({ code: 'KE', category: '', name: 'Kemi' })
    expect(parse('SO')).toEqual({
      code: 'SO',
      category: '',
      name: 'Samhällsorienterande ämnen',
    })
    expect(parse('GE')).toEqual({ code: 'GE', category: '', name: 'Geografi' })
    expect(parse('HI')).toEqual({ code: 'HI', category: '', name: 'Historia' })
    expect(parse('RE')).toEqual({
      code: 'RE',
      category: '',
      name: 'Religionskunskap',
    })
    expect(parse('SH')).toEqual({
      code: 'SH',
      category: '',
      name: 'Samhällskunskap',
    })
    expect(parse('SL')).toEqual({ code: 'SL', category: '', name: 'Slöjd' })
    expect(parse('SV')).toEqual({ code: 'SV', category: '', name: 'Svenska' })
    expect(parse('SVA')).toEqual({
      code: 'SVA',
      category: '',
      name: 'Svenska som andraspråk',
    })
    expect(parse('TN')).toEqual({
      code: 'TN',
      category: '',
      name: 'Teckenspråk',
    })
    expect(parse('TK')).toEqual({ code: 'TK', category: '', name: 'Teknik' })
    expect(parse('DA')).toEqual({
      code: 'DA',
      category: '',
      name: 'Förberedande dansarutbildning',
    })
    expect(parse('JU')).toEqual({
      code: 'JU',
      category: '',
      name: 'Judiska studier',
    })
    expect(parse('ES')).toEqual({
      code: 'ES',
      category: '',
      name: 'Estetisk verksamhet',
    })
  })
  it('Träningsskolans ämnesområden', () => {
    expect(parse('KOM')).toEqual({
      code: 'KOM',
      category: 'Träningsskolan',
      name: 'Kommunikation',
    })
    expect(parse('MOT')).toEqual({
      code: 'MOT',
      category: 'Träningsskolan',
      name: 'Motorik',
    })
    expect(parse('VAA')).toEqual({
      code: 'VAA',
      category: 'Träningsskolan',
      name: 'Vardagsaktiviteter',
    })
    expect(parse('VEU')).toEqual({
      code: 'VEU',
      category: 'Träningsskolan',
      name: 'Verklighetsuppfattning',
    })
  })
  it('Moderna språk, elevens val', () => {
    expect(parse('M1SP')).toEqual({
      code: 'M1SP',
      category: 'Moderna språk, elevens val',
      name: 'Spanska',
    })
    expect(parse('M1FR')).toEqual({
      code: 'M1FR',
      category: 'Moderna språk, elevens val',
      name: 'Franska',
    })
    expect(parse('M1TY')).toEqual({
      code: 'M1TY',
      category: 'Moderna språk, elevens val',
      name: 'Tyska',
    })
    expect(parse('M1DAN')).toEqual({
      code: 'M1DAN',
      category: 'Moderna språk, elevens val',
      name: 'Danska',
    })
    expect(parse('M1FI')).toEqual({
      code: 'M1FI',
      category: 'Moderna språk, elevens val',
      name: 'Finska',
    })
    expect(parse('M1HEB')).toEqual({
      code: 'M1HEB',
      category: 'Moderna språk, elevens val',
      name: 'Hebreiska',
    })
    expect(parse('M1IT')).toEqual({
      code: 'M1IT',
      category: 'Moderna språk, elevens val',
      name: 'Italienska',
    })
    expect(parse('M1JAP')).toEqual({
      code: 'M1JAP',
      category: 'Moderna språk, elevens val',
      name: 'Japanska',
    })
    expect(parse('M1KI')).toEqual({
      code: 'M1KI',
      category: 'Moderna språk, elevens val',
      name: 'Kinesiska',
    })
    expect(parse('M1PO')).toEqual({
      code: 'M1PO',
      category: 'Moderna språk, elevens val',
      name: 'Portugisiska',
    })
    expect(parse('M1RY')).toEqual({
      code: 'M1RY',
      category: 'Moderna språk, elevens val',
      name: 'Ryska',
    })
    expect(parse('M1SAM')).toEqual({
      code: 'M1SAM',
      category: 'Moderna språk, elevens val',
      name: 'Samiska',
    })
    expect(parse('M1SVA')).toEqual({
      code: 'M1SVA',
      category: 'Moderna språk, elevens val',
      name: 'Svenska som andraspråk',
    })
    expect(parse('M1TN')).toEqual({
      code: 'M1TN',
      category: 'Moderna språk, elevens val',
      name: 'Teckenspråk',
    })
  })
  it('Moderna språk, språkval', () => {
    expect(parse('M2SP')).toEqual({
      code: 'M2SP',
      category: 'Moderna språk, språkval',
      name: 'Spanska',
    })
    expect(parse('M2FR')).toEqual({
      code: 'M2FR',
      category: 'Moderna språk, språkval',
      name: 'Franska',
    })
    expect(parse('M2TY')).toEqual({
      code: 'M2TY',
      category: 'Moderna språk, språkval',
      name: 'Tyska',
    })
    expect(parse('M2DAN')).toEqual({
      code: 'M2DAN',
      category: 'Moderna språk, språkval',
      name: 'Danska',
    })
    expect(parse('M2FI')).toEqual({
      code: 'M2FI',
      category: 'Moderna språk, språkval',
      name: 'Finska',
    })
    expect(parse('M2HEB')).toEqual({
      code: 'M2HEB',
      category: 'Moderna språk, språkval',
      name: 'Hebreiska',
    })
    expect(parse('M2IT')).toEqual({
      code: 'M2IT',
      category: 'Moderna språk, språkval',
      name: 'Italienska',
    })
    expect(parse('M2JAP')).toEqual({
      code: 'M2JAP',
      category: 'Moderna språk, språkval',
      name: 'Japanska',
    })
    expect(parse('M2KI')).toEqual({
      code: 'M2KI',
      category: 'Moderna språk, språkval',
      name: 'Kinesiska',
    })
    expect(parse('M2PO')).toEqual({
      code: 'M2PO',
      category: 'Moderna språk, språkval',
      name: 'Portugisiska',
    })
    expect(parse('M2RY')).toEqual({
      code: 'M2RY',
      category: 'Moderna språk, språkval',
      name: 'Ryska',
    })
    expect(parse('M2SAM')).toEqual({
      code: 'M2SAM',
      category: 'Moderna språk, språkval',
      name: 'Samiska',
    })
    expect(parse('M2SVA')).toEqual({
      code: 'M2SVA',
      category: 'Moderna språk, språkval',
      name: 'Svenska som andraspråk',
    })
    expect(parse('M2TN')).toEqual({
      code: 'M2TN',
      category: 'Moderna språk, språkval',
      name: 'Teckenspråk',
    })
  })
  it('Alt moderna språk, språkval', () => {
    expect(parse('ASSVEN')).toEqual({
      code: 'ASSVEN',
      category: 'Alt moderna språk, språkval',
      name: 'Engelska',
    })
    expect(parse('ASSVSV')).toEqual({
      code: 'ASSVSV',
      category: 'Alt moderna språk, språkval',
      name: 'Svenska',
    })
  })
  it('Modersmål', () => {
    expect(parse('MLACE')).toEqual({
      code: 'MLACE',
      category: 'Modersmål',
      name: 'Acehnesiska',
    })
    expect(parse('MLACH')).toEqual({
      code: 'MLACH',
      category: 'Modersmål',
      name: 'Acoli',
    })
    expect(parse('MLAAR')).toEqual({
      code: 'MLAAR',
      category: 'Modersmål',
      name: 'Afar, Danakil',
    })
    expect(parse('MLAFR')).toEqual({
      code: 'MLAFR',
      category: 'Modersmål',
      name: 'Afrikaans',
    })
    expect(parse('MLAKA')).toEqual({
      code: 'MLAKA',
      category: 'Modersmål',
      name: 'Akan',
    })
    expect(parse('MLSQI')).toEqual({
      code: 'MLSQI',
      category: 'Modersmål',
      name: 'Albanska',
    })
    expect(parse('MLAMH')).toEqual({
      code: 'MLAMH',
      category: 'Modersmål',
      name: 'Amhariska',
    })
    expect(parse('MLARA')).toEqual({
      code: 'MLARA',
      category: 'Modersmål',
      name: 'Arabiska',
    })
    expect(parse('MLHYE')).toEqual({
      code: 'MLHYE',
      category: 'Modersmål',
      name: 'Armeniska',
    })
    expect(parse('MLAII')).toEqual({
      code: 'MLAII',
      category: 'Modersmål',
      name: 'Assyriska, Nyarameiska',
    })
    expect(parse('MLAYM')).toEqual({
      code: 'MLAYM',
      category: 'Modersmål',
      name: 'Aymara',
    })
    expect(parse('MLAZE')).toEqual({
      code: 'MLAZE',
      category: 'Modersmål',
      name: 'Azerbadjanska',
    })
    expect(parse('MLBAL')).toEqual({
      code: 'MLBAL',
      category: 'Modersmål',
      name: 'Baluchiska',
    })
    expect(parse('MLBAM')).toEqual({
      code: 'MLBAM',
      category: 'Modersmål',
      name: 'Bambara',
    })
    expect(parse('MLBAI')).toEqual({
      code: 'MLBAI',
      category: 'Modersmål',
      name: 'Bamileke',
    })
    expect(parse('MLEUS')).toEqual({
      code: 'MLEUS',
      category: 'Modersmål',
      name: 'Baskiska',
    })
    expect(parse('MLBEM')).toEqual({
      code: 'MLBEM',
      category: 'Modersmål',
      name: 'Bemba',
    })
    expect(parse('MLBEN')).toEqual({
      code: 'MLBEN',
      category: 'Modersmål',
      name: 'Bengaliska',
    })
    expect(parse('MLBER')).toEqual({
      code: 'MLBER',
      category: 'Modersmål',
      name: 'Berbiska',
    })
    expect(parse('MLBIL')).toEqual({
      code: 'MLBIL',
      category: 'Modersmål',
      name: 'Bile',
    })
    expect(parse('MLBYN')).toEqual({
      code: 'MLBYN',
      category: 'Modersmål',
      name: 'Bilen, Bilein, Bileno, Bilin',
    })
    expect(parse('MLBOS')).toEqual({
      code: 'MLBOS',
      category: 'Modersmål',
      name: 'Bosniska',
    })
    expect(parse('MLBUL')).toEqual({
      code: 'MLBUL',
      category: 'Modersmål',
      name: 'Bulgariska',
    })
    expect(parse('MLMYA')).toEqual({
      code: 'MLMYA',
      category: 'Modersmål',
      name: 'Burmesiska',
    })
    expect(parse('MLBOS')).toEqual({
      code: 'MLBOS',
      category: 'Modersmål',
      name: 'Bosniska',
    })
    expect(parse('MLCEB')).toEqual({
      code: 'MLCEB',
      category: 'Modersmål',
      name: 'Cebuanska, Binisaya, Sebuano, Sugbuanon, Sugbuhanon, Visayan',
    })
    expect(parse('MLDAN')).toEqual({
      code: 'MLDAN',
      category: 'Modersmål',
      name: 'Danska',
    })
    expect(parse('MLDAR')).toEqual({
      code: 'MLDAR',
      category: 'Modersmål',
      name: 'Darginska, Dargi, Dargin, Dargintsy, Khiurkilinskii, Uslar',
    })
    expect(parse('MLPRS')).toEqual({
      code: 'MLPRS',
      category: 'Modersmål',
      name: 'Dari, Parsi, Persian',
    })
    expect(parse('MLDMQ')).toEqual({
      code: 'MLDMQ',
      category: 'Modersmål',
      name: 'Dimli',
    })
    expect(parse('MLDIV')).toEqual({
      code: 'MLDIV',
      category: 'Modersmål',
      name: 'Divehi',
    })
    expect(parse('MLENG')).toEqual({
      code: 'MLENG',
      category: 'Modersmål',
      name: 'Engelska',
    })
    expect(parse('MLEST')).toEqual({
      code: 'MLEST',
      category: 'Modersmål',
      name: 'Estniska',
    })
    expect(parse('MLEWE')).toEqual({
      code: 'MLEWE',
      category: 'Modersmål',
      name: 'Ewe',
    })
    expect(parse('MLFIJ')).toEqual({
      code: 'MLFIJ',
      category: 'Modersmål',
      name: 'Fijianska',
    })
    expect(parse('MLFIN')).toEqual({
      code: 'MLFIN',
      category: 'Modersmål',
      name: 'Finska',
    })
    expect(parse('MLVLS')).toEqual({
      code: 'MLVLS',
      category: 'Modersmål',
      name: 'Flamländska',
    })
    expect(parse('MLFRA')).toEqual({
      code: 'MLFRA',
      category: 'Modersmål',
      name: 'Franska',
    })
    expect(parse('MLFAO')).toEqual({
      code: 'MLFAO',
      category: 'Modersmål',
      name: 'Färöiska',
    })
    expect(parse('MLGAA')).toEqual({
      code: 'MLGAA',
      category: 'Modersmål',
      name: 'Ga',
    })
    expect(parse('MLKAT')).toEqual({
      code: 'MLKAT',
      category: 'Modersmål',
      name: 'Georgiska',
    })
    expect(parse('MLGRE')).toEqual({
      code: 'MLGRE',
      category: 'Modersmål',
      name: 'Grekiska',
    })
    expect(parse('MLKAL')).toEqual({
      code: 'MLKAL',
      category: 'Modersmål',
      name: 'Grönländska',
    })
    expect(parse('MLGUJ')).toEqual({
      code: 'MLGUJ',
      category: 'Modersmål',
      name: 'Gujarati',
    })
    expect(parse('MLHEB')).toEqual({
      code: 'MLHEB',
      category: 'Modersmål',
      name: 'Hebreiska',
    })
    expect(parse('MLHIN')).toEqual({
      code: 'MLHIN',
      category: 'Modersmål',
      name: 'Hindi',
    })
    expect(parse('MLIBO')).toEqual({
      code: 'MLIBO',
      category: 'Modersmål',
      name: 'Ibo',
    })
    expect(parse('MLIND')).toEqual({
      code: 'MLIND',
      category: 'Modersmål',
      name: 'Indonesiska',
    })
    expect(parse('MLISL')).toEqual({
      code: 'MLISL',
      category: 'Modersmål',
      name: 'Isländska',
    })
    expect(parse('MLITA')).toEqual({
      code: 'MLITA',
      category: 'Modersmål',
      name: 'Italienska',
    })
    expect(parse('MLJPN')).toEqual({
      code: 'MLJPN',
      category: 'Modersmål',
      name: 'Japanska',
    })
    expect(parse('MLYID')).toEqual({
      code: 'MLYID',
      category: 'Modersmål',
      name: 'Jiddisch',
    })
    expect(parse('MLKAM')).toEqual({
      code: 'MLKAM',
      category: 'Modersmål',
      name: 'Kamba',
    })
    expect(parse('MLKHM')).toEqual({
      code: 'MLKHM',
      category: 'Modersmål',
      name: 'Khmer',
    })
    expect(parse('MLKAN')).toEqual({
      code: 'MLKAN',
      category: 'Modersmål',
      name: 'Kannada',
    })
    expect(parse('MLKAR')).toEqual({
      code: 'MLKAR',
      category: 'Modersmål',
      name: 'Karenska',
    })
    expect(parse('MLCAT')).toEqual({
      code: 'MLCAT',
      category: 'Modersmål',
      name: 'Katalanska',
    })
    expect(parse('MLKAZ')).toEqual({
      code: 'MLKAZ',
      category: 'Modersmål',
      name: 'Kazakiska',
    })
    expect(parse('MLKIK')).toEqual({
      code: 'MLKIK',
      category: 'Modersmål',
      name: 'Kikuyu',
    })
    expect(parse('MLZHO')).toEqual({
      code: 'MLZHO',
      category: 'Modersmål',
      name: 'Kinesiska',
    })
    expect(parse('MLCMN')).toEqual({
      code: 'MLCMN',
      category: 'Modersmål',
      name: 'Kinesiska, Mandarin',
    })
    expect(parse('MLHAK')).toEqual({
      code: 'MLHAK',
      category: 'Modersmål',
      name: 'Kinesiska, Hakka',
    })
    expect(parse('MLYUE')).toEqual({
      code: 'MLYUE',
      category: 'Modersmål',
      name: 'Kinesiska, Kantonesiska',
    })
    expect(parse('MLNAN')).toEqual({
      code: 'MLNAN',
      category: 'Modersmål',
      name: 'Kinesiska, Min Nan',
    })
    expect(parse('MLKIN')).toEqual({
      code: 'MLKIN',
      category: 'Modersmål',
      name: 'Kinyarwanda',
    })
    expect(parse('MLKIR')).toEqual({
      code: 'MLKIR',
      category: 'Modersmål',
      name: 'Kirgisiska',
    })
    expect(parse('MLRUN')).toEqual({
      code: 'MLRUN',
      category: 'Modersmål',
      name: 'Kirundi',
    })
    expect(parse('MLKON')).toEqual({
      code: 'MLKON',
      category: 'Modersmål',
      name: 'Kongo',
    })
    expect(parse('MLKOR')).toEqual({
      code: 'MLKOR',
      category: 'Modersmål',
      name: 'Koreanska',
    })
    expect(parse('MLROP')).toEqual({
      code: 'MLROP',
      category: 'Modersmål',
      name: 'Kreolska',
    })
    expect(parse('MLHRV')).toEqual({
      code: 'MLHRV',
      category: 'Modersmål',
      name: 'Kroatiska',
    })
    expect(parse('MLKRO')).toEqual({
      code: 'MLKRO',
      category: 'Modersmål',
      name: 'Kru',
    })
    expect(parse('MLKUR')).toEqual({
      code: 'MLKUR',
      category: 'Modersmål',
      name: 'Kurdiska',
    })
    expect(parse('MLCKB')).toEqual({
      code: 'MLCKB',
      category: 'Modersmål',
      name: 'Kurdiska, centr.',
    })
    expect(parse('MLKMR')).toEqual({
      code: 'MLKMR',
      category: 'Modersmål',
      name: 'Kurdiska, norra',
    })
    expect(parse('MLSDH')).toEqual({
      code: 'MLSDH',
      category: 'Modersmål',
      name: 'Kurdiska, södra',
    })
    expect(parse('MLLAO')).toEqual({
      code: 'MLLAO',
      category: 'Modersmål',
      name: 'Laotiska',
    })
    expect(parse('MLLAV')).toEqual({
      code: 'MLLAV',
      category: 'Modersmål',
      name: 'Lettiska',
    })
    expect(parse('MLLMA')).toEqual({
      code: 'MLLMA',
      category: 'Modersmål',
      name: 'Limba',
    })
    expect(parse('MLLIN')).toEqual({
      code: 'MLLIN',
      category: 'Modersmål',
      name: 'Lingala',
    })
    expect(parse('MLLIT')).toEqual({
      code: 'MLLIT',
      category: 'Modersmål',
      name: 'Litauiska',
    })
    expect(parse('MLLUG')).toEqual({
      code: 'MLLUG',
      category: 'Modersmål',
      name: 'Luganda/Ganda',
    })
    expect(parse('MLLUO')).toEqual({
      code: 'MLLUO',
      category: 'Modersmål',
      name: 'Luo',
    })
    expect(parse('MLMKD')).toEqual({
      code: 'MLMKD',
      category: 'Modersmål',
      name: 'Makedonska',
    })
    expect(parse('MLMLG')).toEqual({
      code: 'MLMLG',
      category: 'Modersmål',
      name: 'Malagaskiska',
    })
    expect(parse('MLMSA')).toEqual({
      code: 'MLMSA',
      category: 'Modersmål',
      name: 'Malajiska',
    })
    expect(parse('MLMAL')).toEqual({
      code: 'MLMAL',
      category: 'Modersmål',
      name: 'Malayalami',
    })
    expect(parse('MLMLT')).toEqual({
      code: 'MLMLT',
      category: 'Modersmål',
      name: 'Maltesiska',
    })
    expect(parse('MLMNK')).toEqual({
      code: 'MLMNK',
      category: 'Modersmål',
      name: 'Mandinka',
    })
    expect(parse('MLMRI')).toEqual({
      code: 'MLMRI',
      category: 'Modersmål',
      name: 'Maori',
    })
    expect(parse('MLMAR')).toEqual({
      code: 'MLMAR',
      category: 'Modersmål',
      name: 'Marathi',
    })
    expect(parse('MLMYX')).toEqual({
      code: 'MLMYX',
      category: 'Modersmål',
      name: 'Masaaba, Gisu, Gugisu, Lumasaaba, Masaba',
    })
    expect(parse('MLFIT')).toEqual({
      code: 'MLFIT',
      category: 'Modersmål',
      name: 'Meänkieli',
    })
    expect(parse('MLMON')).toEqual({
      code: 'MLMON',
      category: 'Modersmål',
      name: 'Mongoliska',
    })
    expect(parse('MLNLD')).toEqual({
      code: 'MLNLD',
      category: 'Modersmål',
      name: 'Nederländska',
    })
    expect(parse('MLNEP')).toEqual({
      code: 'MLNEP',
      category: 'Modersmål',
      name: 'Nepalesiska',
    })
    expect(parse('MLNOR')).toEqual({
      code: 'MLNOR',
      category: 'Modersmål',
      name: 'Norska',
    })
    expect(parse('MLNYA')).toEqual({
      code: 'MLNYA',
      category: 'Modersmål',
      name: 'Nyanja',
    })
    expect(parse('MLORM')).toEqual({
      code: 'MLORM',
      category: 'Modersmål',
      name: 'Oromo',
    })
    expect(parse('MLPUS')).toEqual({
      code: 'MLPUS',
      category: 'Modersmål',
      name: 'Pashto',
    })
    expect(parse('MLPTN')).toEqual({
      code: 'MLPTN',
      category: 'Modersmål',
      name: 'Patani',
    })
    expect(parse('MLFAS')).toEqual({
      code: 'MLFAS',
      category: 'Modersmål',
      name: 'Persiska',
    })
    expect(parse('MLPOL')).toEqual({
      code: 'MLPOL',
      category: 'Modersmål',
      name: 'Polska',
    })
    expect(parse('MLPOR')).toEqual({
      code: 'MLPOR',
      category: 'Modersmål',
      name: 'Portugisiska',
    })
    expect(parse('MLPAN')).toEqual({
      code: 'MLPAN',
      category: 'Modersmål',
      name: 'Punjabi',
    })
    expect(parse('MLROM')).toEqual({
      code: 'MLROM',
      category: 'Modersmål',
      name: 'Romani',
    })
    expect(parse('MLRMC')).toEqual({
      code: 'MLRMC',
      category: 'Modersmål',
      name: 'Romani, Karpaterna',
    })
    expect(parse('MLRML')).toEqual({
      code: 'MLRML',
      category: 'Modersmål',
      name: 'Romani, Baltisk',
    })
    expect(parse('MLRMN')).toEqual({
      code: 'MLRMN',
      category: 'Modersmål',
      name: 'Romani, Arli',
    })
    expect(parse('MLRMF')).toEqual({
      code: 'MLRMF',
      category: 'Modersmål',
      name: 'Romani, Kalé',
    })
    expect(parse('MLRMO')).toEqual({
      code: 'MLRMO',
      category: 'Modersmål',
      name: 'Romani, Sinti',
    })
    expect(parse('MLRMU')).toEqual({
      code: 'MLRMU',
      category: 'Modersmål',
      name: 'Romani, Tavringer',
    })
    expect(parse('MLRMY')).toEqual({
      code: 'MLRMY',
      category: 'Modersmål',
      name: 'Romani, Lovari, Kalderari',
    })
    expect(parse('MLRON')).toEqual({
      code: 'MLRON',
      category: 'Modersmål',
      name: 'Rumänska',
    })
    expect(parse('MLRUS')).toEqual({
      code: 'MLRUS',
      category: 'Modersmål',
      name: 'Ryska',
    })
    expect(parse('MLSSY')).toEqual({
      code: 'MLSSY',
      category: 'Modersmål',
      name: 'Saho',
    })
    expect(parse('MLNSM')).toEqual({
      code: 'MLNSM',
      category: 'Modersmål',
      name: 'Samiska, (norra)',
    })
    expect(parse('MLSMI')).toEqual({
      code: 'MLSMI',
      category: 'Modersmål',
      name: 'Samiska',
    })
    expect(parse('MLSMJ')).toEqual({
      code: 'MLSMJ',
      category: 'Modersmål',
      name: 'Samiska, Lulesamiska',
    })
    expect(parse('MLSJE')).toEqual({
      code: 'MLSJE',
      category: 'Modersmål',
      name: 'Samiska, Pitesamiska',
    })
    expect(parse('MLSMA')).toEqual({
      code: 'MLSMA',
      category: 'Modersmål',
      name: 'Samiska, Sydsamiska',
    })
    expect(parse('MLSJU')).toEqual({
      code: 'MLSJU',
      category: 'Modersmål',
      name: 'Samiska, Umesamiska',
    })
    expect(parse('MLSMO')).toEqual({
      code: 'MLSMO',
      category: 'Modersmål',
      name: 'Samoanska',
    })
    expect(parse('MLSRP')).toEqual({
      code: 'MLSRP',
      category: 'Modersmål',
      name: 'Serbiska',
    })
    expect(parse('MLHBS')).toEqual({
      code: 'MLHBS',
      category: 'Modersmål',
      name: 'Serbokroatiska',
    })
    expect(parse('MLSOT')).toEqual({
      code: 'MLSOT',
      category: 'Modersmål',
      name: 'Sydsotho',
    })
    expect(parse('MLSNA')).toEqual({
      code: 'MLSNA',
      category: 'Modersmål',
      name: 'Shona',
    })
    expect(parse('MLSIN')).toEqual({
      code: 'MLSIN',
      category: 'Modersmål',
      name: 'Singalesiska',
    })
    expect(parse('MLSLK')).toEqual({
      code: 'MLSLK',
      category: 'Modersmål',
      name: 'Slovakiska',
    })
    expect(parse('MLSLV')).toEqual({
      code: 'MLSLV',
      category: 'Modersmål',
      name: 'Slovenska',
    })
    expect(parse('MLSOM')).toEqual({
      code: 'MLSOM',
      category: 'Modersmål',
      name: 'Somaliska',
    })
    expect(parse('MLSPA')).toEqual({
      code: 'MLSPA',
      category: 'Modersmål',
      name: 'Spanska',
    })
    expect(parse('MLSWA')).toEqual({
      code: 'MLSWA',
      category: 'Modersmål',
      name: 'Swahili',
    })
    expect(parse('MLSYC')).toEqual({
      code: 'MLSYC',
      category: 'Modersmål',
      name: 'Syrianska/assyriska, suryaya, suryoyo',
    })
    expect(parse('MLSYR')).toEqual({
      code: 'MLSYR',
      category: 'Modersmål',
      name: 'Syriska',
    })
    expect(parse('MLTRU')).toEqual({
      code: 'MLTRU',
      category: 'Modersmål',
      name: 'Syriska, Turoyo',
    })
    expect(parse('MLTLG')).toEqual({
      code: 'MLTLG',
      category: 'Modersmål',
      name: 'Tagalog',
    })
    expect(parse('MLTAM')).toEqual({
      code: 'MLTAM',
      category: 'Modersmål',
      name: 'Tamil',
    })
    expect(parse('MLTAT')).toEqual({
      code: 'MLTAT',
      category: 'Modersmål',
      name: 'Tatariska',
    })
    expect(parse('MLTEL')).toEqual({
      code: 'MLTEL',
      category: 'Modersmål',
      name: 'Telugu',
    })
    expect(parse('MLTHA')).toEqual({
      code: 'MLTHA',
      category: 'Modersmål',
      name: 'Thai',
    })
    expect(parse('MLTIB')).toEqual({
      code: 'MLTIB',
      category: 'Modersmål',
      name: 'Tibetanska',
    })
    expect(parse('MLTIG')).toEqual({
      code: 'MLTIG',
      category: 'Modersmål',
      name: 'Tigre',
    })
    expect(parse('MLTIR')).toEqual({
      code: 'MLTIR',
      category: 'Modersmål',
      name: 'Tigrinja',
    })
    expect(parse('MLCES')).toEqual({
      code: 'MLCES',
      category: 'Modersmål',
      name: 'Tjeckiska',
    })
    expect(parse('MLTON')).toEqual({
      code: 'MLTON',
      category: 'Modersmål',
      name: 'Tonganska',
    })
    expect(parse('MLTSN')).toEqual({
      code: 'MLTSN',
      category: 'Modersmål',
      name: 'Tswana',
    })
    expect(parse('MLTUR')).toEqual({
      code: 'MLTUR',
      category: 'Modersmål',
      name: 'Turkiska',
    })
    expect(parse('MLDEU')).toEqual({
      code: 'MLDEU',
      category: 'Modersmål',
      name: 'Tyska',
    })
    expect(parse('MLUIG')).toEqual({
      code: 'MLUIG',
      category: 'Modersmål',
      name: 'Uiguriska',
    })
    expect(parse('MLUKR')).toEqual({
      code: 'MLUKR',
      category: 'Modersmål',
      name: 'Ukrainska',
    })
    expect(parse('MLHUN')).toEqual({
      code: 'MLHUN',
      category: 'Modersmål',
      name: 'Ungerska',
    })
    expect(parse('MLURD')).toEqual({
      code: 'MLURD',
      category: 'Modersmål',
      name: 'Urdu',
    })
    expect(parse('MLUZB')).toEqual({
      code: 'MLUZB',
      category: 'Modersmål',
      name: 'Uzbekiska',
    })
    expect(parse('MLVIE')).toEqual({
      code: 'MLVIE',
      category: 'Modersmål',
      name: 'Vietnamesiska',
    })
    expect(parse('MLWOL')).toEqual({
      code: 'MLWOL',
      category: 'Modersmål',
      name: 'Wolof',
    })
    expect(parse('MLYOR')).toEqual({
      code: 'MLYOR',
      category: 'Modersmål',
      name: 'Yoruba',
    })
    expect(parse('MLZUL')).toEqual({
      code: 'MLZUL',
      category: 'Modersmål',
      name: 'Zulu',
    })
    expect(parse('MLSPK')).toEqual({
      code: 'MLSPK',
      category: 'Modersmål',
      name: 'Övriga språk',
    })
  })
  it('handles comments', () => {
    expect(parse('NO  a)')).toEqual({
      code: 'NO',
      category: '',
      name: 'Naturorienterande ämnen',
      comment: 'a)',
    })
    expect(parse('MTID Arbetslagsråd 7C')).toEqual({
      code: 'MTID',
      category: 'Diverse',
      name: 'Mentorstid',
      comment: 'Arbetslagsråd 7C',
    })
  })
})
