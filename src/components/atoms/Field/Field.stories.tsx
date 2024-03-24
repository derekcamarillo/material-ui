import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Field, type IFieldProps } from './Field';

// https://github.com/material-components/material-web/blob/main/field/demo/stories.ts

const meta = {
  component: Field,
} satisfies Meta<typeof Field>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: '200px',
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IFieldProps>;

const states: Array<IComponentPresentation<IFieldProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'Value',
    props: { value: 'Value' },
  },
];

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Field}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Field}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
