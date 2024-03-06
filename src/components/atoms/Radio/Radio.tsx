import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type { IRadioStyleKey, IRadioStyleVarKey } from './Radio.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { useRadioGroupContext } from '../RadioGroup/useRadioGroupContext';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/radio/internal/radio.ts

const DEFAULT_TAG = 'input';

export type IRadioOwnProps = IContainerProps<IRadioStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    };
    visualState?: IVisualState;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    checked?: boolean;
    value?: string;
    onChange?: (checked: boolean) => IMaybeAsync<IAny>;
  };

export type IRadioProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IRadioOwnProps>;

type IRadio = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IRadioProps<TRoot>,
) => React.ReactNode;

export const Radio: IRadio = forwardRef(function Radio<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IRadioProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = DEFAULT_TAG,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    onChange,
    disabled,
    value,
    checked: checkedProp,
    name: nameProp,
    ...other
  } = props as IWithAsProp<IRadioOwnProps>;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

  const { theme } = useComponentTheme('Radio');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<IRadioStyleKey, IRadioStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const radioGroupContext = useRadioGroupContext();

  // Unique maskId is required because of a Safari bug that fail to persist
  // reference to the mask. This should be removed once the bug is fixed.
  const maskId = useId();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      Promise.resolve(
        radioGroupContext
          ? radioGroupContext?.onChange(value)
          : onChange?.(event.target.checked),
      ).catch((error: Error) => {
        throw error;
      });
    },
    [onChange, radioGroupContext, value],
  );

  const name = radioGroupContext?.name ?? nameProp;
  const checked = !disabled
    ? radioGroupContext
      ? radioGroupContext.value !== undefined &&
        radioGroupContext.value === value
      : checkedProp
    : false;

  return (
    <div
      {...styleProps(['host', disabled && 'host$disabled', sx], [theme.vars])}
    >
      <div {...styleProps(['container', checked && 'container$checked'])}>
        <StateLayer
          for={actionRef}
          styles={[theme.stateLayerStyles, ...asArray(innerStyles?.stateLayer)]}
          disabled={disabled}
          visualState={visualState}
        />
        <FocusRing
          for={actionRef}
          styles={[theme.focusRingStyles, ...asArray(innerStyles?.focusRing)]}
          visualState={visualState}
        />

        <svg
          {...styleProps([
            'icon',
            checked && 'icon$checked',
            disabled && (checked ? 'icon$checked$disabled' : 'icon$disabled'),
          ])}
          viewBox='0 0 20 20'
        >
          <mask id={maskId}>
            <rect width='100%' height='100%' fill='white' />
            <circle cx='10' cy='10' r='8' fill='black' />
          </mask>
          <circle
            {...styleProps(['circle$outer', disabled && 'circle$disabled'])}
            cx='10'
            cy='10'
            r='10'
            mask={`url(#${maskId})`}
          />
          <circle
            {...styleProps([
              'circle$inner',
              checked && 'circle$inner$checked',
              disabled && 'circle$disabled',
            ])}
            cx='10'
            cy='10'
            r='5'
          />
        </svg>

        <Component
          {...styleProps(['input'])}
          ref={handleRef}
          name={name}
          type='radio'
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          {...other}
        />
      </div>
    </div>
  );
});
