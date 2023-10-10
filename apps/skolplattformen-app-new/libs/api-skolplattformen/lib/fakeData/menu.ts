import {Child, MenuItem} from '../../../../libs/api/lib';
import {DateTime} from 'luxon';
import {children} from './children';

export const menu = (child: Child): MenuItem[] => menuData.get(child.id) ?? [];

const getDate = () => DateTime.now();
const week = getDate().weekNumber.toString();

const [child1, child2] = children();

const menuData = new Map<string, MenuItem[]>([
  [
    child1.id,
    [
      {
        title: 'Måndag - Vecka ' + week,
        description: 'Kebabgryta ris<br/>Ratatouille med kikärter',
      },
      {
        title: 'Tisdag - Vecka ' + week,
        description: 'Ost-broccolisås pasta Fusilli',
      },
      {
        title: 'Onsdag - Vecka ' + week,
        description: 'Köttbullar potatis gräddsås lingon<br/>Falafel',
      },
      {
        title: 'Torsdag - Vecka ' + week,
        description:
          'Prinskorv potatis rödbetssallad +<br/>Inlagd och senapssill',
      },
      {
        title: 'Fredag - Vecka ' + week,
        description:
          'Avslutning  Varmkorv bröd ketchup senap<br/>( F-3 i matsalen från 10:30 )',
      },
    ],
  ],
  [
    child2.id,
    [
      {
        title: 'Måndag - Vecka ' + week,
        description:
          'Thailändsk kycklinggryta med kokosmjölk, rödcurry och jasminris<br/>Thailänsk grönsaksgryta med kokosmjölk, rödcurry och jasminris',
      },
      {
        title: 'Tisdag - Vecka ' + week,
        description: 'Örtomlett med potatis , medelhavsost och olivtapenad',
      },
      {
        title: 'Onsdag - Vecka ' + week,
        description:
          'Spagetti med rökt kalkon , grädde, dijon och persilja<br/>Spagetti med rostade bönor , grädde , dijon och persilja',
      },
      {
        title: 'Torsdag - Vecka ' + week,
        description:
          'Panerad flundra med dansk remoulad och koktåotatis<br/>morot och linsbiff med danska remoulad och koktpotatis',
      },
      {
        title: 'Fredag - Vecka ' + week,
        description:
          'Texaschili på högrev med picklad rödlök och bulgur<br/>Texaschili på svartabönor picklad rödlök och bulgur',
      },
    ],
  ],
]);
