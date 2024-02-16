import * as React from 'react';
import * as ReactIs from 'react-is';
import { asArray } from '@olivierpascal/helpers';

import type { IZeroOrMore, ICompiledStyles } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type {
  IBreadcrumbsStyleKey,
  IBreadcrumbsStyleVarKey,
} from './Breadcrumbs.styledefs';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { isProduction } from '@/helpers/isProduction';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

import { ReactComponent as EllipsisHorizontal } from '@/assets/EllipsisHorizontal.svg';
import { ButtonBase } from '../Button';

export interface IBreadcrumbsProps
  extends IContainer<IBreadcrumbsStyleKey, IBreadcrumbsStyleVarKey>,
    Pick<React.ButtonHTMLAttributes<HTMLElement>, 'aria-label'> {
  innerStyles?: {
    expandButton?: IZeroOrMore<ICompiledStyles<IBreadcrumbsStyleKey>>;
    expandButtonFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };
  children: React.ReactNode;
  expandText?: string;
  itemCountBeforeCollapse?: number;
  itemCountAfterCollapse?: number;
  maxItems?: number;
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({
  children,
  expandText = 'Show path',
  itemCountBeforeCollapse = 1,
  itemCountAfterCollapse = 1,
  maxItems = 8,
  separator = '/',
  ...props
}) => {
  const theme = useComponentTheme('Breadcrumbs');

  const [expanded, setExpanded] = React.useState(false);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IBreadcrumbsStyleKey, IBreadcrumbsStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const insertSeparators = React.useCallback(
    (items: Array<JSX.Element>): Array<JSX.Element> =>
      items.reduce((acc, current, index) => {
        return index < items.length - 1
          ? [
              ...acc,
              current,
              <li
                aria-hidden
                key={`separator-${index}`}
                {...styleProps(['item', 'separator'])}
              >
                {separator}
              </li>,
            ]
          : [...acc, current];
      }, [] as Array<JSX.Element>),
    [styleProps, separator],
  );

  const renderItemsBeforeAndAfter = (
    items: Array<JSX.Element>,
  ): Array<JSX.Element> => {
    const handleClickExpand = (): void => {
      if (expanded) {
        return;
      }

      setExpanded(true);
    };

    // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemCountBeforeCollapse + itemCountAfterCollapse >= items.length) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(
          [
            'sixui: You have provided an invalid combination of props to the Breadcrumbs.',
            `itemCountBeforeCollapse (${itemCountBeforeCollapse}) + itemCountAfterCollapse (${itemCountAfterCollapse}) >= maxItems (${maxItems})`,
          ].join('\n'),
        );
      }

      return items;
    }

    return [
      ...items.slice(0, itemCountBeforeCollapse),
      <li key='ellipsis' {...styleProps(['item'])}>
        <ButtonBase
          styles={[
            theme.expandButtonStyles,
            ...asArray(props.innerStyles?.expandButton),
          ]}
          focusRingStyles={[
            theme.expandButtonFocusRingStyles,
            ...asArray(props.innerStyles?.expandButtonFocusRing),
          ]}
          aria-label={expandText}
          key='ellipsis'
          onClick={handleClickExpand}
        >
          <EllipsisHorizontal {...styleProps(['icon'])} aria-hidden />
        </ButtonBase>
      </li>,
      ...items.slice(items.length - itemCountAfterCollapse, items.length),
    ];
  };

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      if (!isProduction()) {
        if (ReactIs.isFragment(child)) {
          // eslint-disable-next-line no-console
          console.error(
            [
              "sixui: The Breadcrumbs component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );
        }
      }

      return React.isValidElement(child);
    })
    .map((child, index) => (
      <li {...styleProps(['item'])} key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <nav
      {...styleProps(['host', props.sx], [theme.vars, props.theme])}
      aria-label={props['aria-label']}
    >
      <ol {...styleProps(['list'])}>
        {insertSeparators(
          expanded || (maxItems !== undefined && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
        )}
      </ol>
    </nav>
  );
};
