import {Child, EtjanstChild, Skola24Child} from '../../api/lib';

export const merge = (
  etjanstChildren: EtjanstChild[],
  skola24Children: Skola24Child[],
): Child[] =>
  etjanstChildren.map(etjanstChild => {
    const skola24Child: Skola24Child =
      skola24Children.find(
        s24c => s24c.firstName && etjanstChild.name.startsWith(s24c.firstName),
      ) || {};
    const child: Child = {
      ...etjanstChild,
      ...skola24Child,
    };
    return child;
  });
