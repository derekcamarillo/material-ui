import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepStyleKey } from '@/components/atoms/Step';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Step.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';

// FIXME: use vars

type IStepStyles = IStyles<IStepStyleKey>;
export const styles: MapNamespaces<IStepStyles> = stylex.create<IStepStyles>({
  host: {},
  host$rightLabel: {},
  host$bottomLabel: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  button: {},
  button$rightLabel: {
    borderRadius: shapeVars.corner$full,
  },
  button$bottomLabel: {
    borderRadius: shapeVars.corner$md,
  },
  buttonFocusRing: {
    borderRadius: shapeVars.corner$full,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  inner$withText: {
    paddingRight: 12,
  },
  inner$rightLabel: {
    flexDirection: 'row',
  },
  inner$bottomLabel: {
    flexDirection: 'column',
  },
  stepIndex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 24,
    height: 24,
  },
  stepIndex$icon: {
    color: colorRolesVars.secondaryContainer,
    fontSize: 24,
  },
  stepIndex$icon$active: {
    color: colorRolesVars.primary,
  },
  stepIndex$icon$completed: {
    color: colorRolesVars.primary,
  },
  stepIndex$icon$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  stepIndex$icon$error: {
    color: colorRolesVars.error,
    fill: 'currentColor',
  },
  stepIndex$text: {
    borderRadius: shapeVars.corner$full,
    backgroundColor: colorRolesVars.secondaryContainer,
    color: colorRolesVars.secondary,

    fontFamily: typescaleVars.labelFont$md,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelLetterSpacing$md,
  },
  stepIndex$text$active: {
    backgroundColor: colorRolesVars.primary,
    color: colorRolesVars.onPrimary,
  },
  stepIndex$text$completed: {
    backgroundColor: colorRolesVars.primary,
    color: colorRolesVars.onPrimary,
  },
  stepIndex$text$disabled: {
    backgroundColor: colorRolesVars.onSurface,
    color: colorRolesVars.surface,
    opacity: stateVars.opacity$disabled,
  },
  stepIndex$text$error: {
    backgroundColor: colorRolesVars.errorContainer,
    color: colorRolesVars.onErrorContainer,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colorRolesVars.secondary,
  },
  labelContainer$disabled: {
    color: colorRolesVars.onSurface,
    opacity: stateVars.opacity$disabled,
  },
  labelContainer$active: {
    color: colorRolesVars.onSurface,
  },
  labelContainer$completed: {
    color: colorRolesVars.onSurface,
  },
  labelContainer$error: {
    color: colorRolesVars.error,
  },
  labelContainer$rightLabel: {
    alignItems: 'flex-start',
  },
  labelContainer$bottomLabel: {},
  label: {
    fontFamily: typescaleVars.labelFont$lg,
    fontSize: typescaleVars.labelSize$lg,
    fontWeight: typescaleVars.labelWeight$lg,
    lineHeight: typescaleVars.labelLineHeight$lg,
    letterSpacing: typescaleVars.labelLetterSpacing$lg,
  },
  supportingText: {
    fontFamily: typescaleVars.labelFont$sm,
    fontSize: typescaleVars.labelSize$sm,
    fontWeight: typescaleVars.labelWeight$sm,
    lineHeight: typescaleVars.labelLineHeight$sm,
    letterSpacing: typescaleVars.labelLetterSpacing$sm,
  },
  content: {
    color: colorRolesVars.onSurface,
    fontFamily: typescaleVars.bodyFont$md,
    fontSize: typescaleVars.bodySize$md,
    fontWeight: typescaleVars.bodyWeight$md,
    lineHeight: typescaleVars.bodyLineHeight$md,
    letterSpacing: typescaleVars.bodyLetterSpacing$md,

    marginLeft: 20, // half icon
    paddingLeft: 8 + 12 - 1, // margin + half icon - border
    paddingRight: 8,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: colorRolesVars.outlineVariant,
  },
  content$active: {
    borderColor: colorRolesVars.primary,
  },
  content$last: {
    borderLeftWidth: 0,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: shapeVars.corner$full,
    // FIXME: adapt corner to layout
  },
});
