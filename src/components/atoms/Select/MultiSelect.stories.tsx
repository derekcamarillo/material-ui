import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
  faEgg,
  faFish,
} from '@fortawesome/free-solid-svg-icons';

import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase2';
import { MultiSelect, type IMultiSelectProps } from './MultiSelect';
import { InputChip } from '@/components/atoms/Chip';

const meta = {
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 300,
  },
  pictureOption: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: shapeVars.corner$md,
  },
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

const defaultArgs = {
  sx: styles.host,
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IMultiSelectProps>;

const ControlledMultiSelect: React.FC<Omit<IMultiSelectProps, 'onChange'>> = (
  props,
) => {
  const [value, setValue] = useState(props.value ?? []);

  const handleChange = (value: Array<string>): void => {
    setValue(value);
    void sbHandleEvent('onChange', value);
  };

  return <MultiSelect {...props} value={value} onChange={handleChange} />;
};

const ControlledSelectWithChip: React.FC<
  Omit<IMultiSelectProps, 'onChange' | 'renderValue'>
> = (props) => {
  const [values, setValues] = useState(props.value ?? []);

  const handleChange = (values: Array<string>): void => {
    setValues(values);
    void sbHandleEvent('onChange', values);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ): void => {
    event.preventDefault();
    setValues((values) => values.filter((v) => v !== value));
  };

  return (
    <MultiSelect
      {...props}
      value={values}
      onChange={handleChange}
      renderOption={(options) =>
        options.length ? (
          <div {...stylex.props(styles.chips)}>
            {options.map((option, index) => (
              <InputChip
                key={index}
                label={option.props.children}
                onDelete={(event) => handleDelete(event, option.props.value)}
                icon={option.props.leadingIcon}
              />
            ))}
          </div>
        ) : null
      }
    />
  );
};

const pictureOptions = [
  <MultiSelect.Option key='apple' value='apple' label='Apple'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Apple'
      src='https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </MultiSelect.Option>,
  <MultiSelect.Option key='lemon' value='lemon' label='Lemon'>
    <img
      {...stylex.props(styles.pictureOption)}
      alt='Lemon'
      src='https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=facearea&facepad=2&w=300&q=80'
    />
  </MultiSelect.Option>,
];

const options = [
  <MultiSelect.Option
    key='apple'
    value='apple'
    leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
  >
    Apple
  </MultiSelect.Option>,
  <MultiSelect.Option
    key='lemon'
    value='lemon'
    leadingIcon={<FontAwesomeIcon icon={faLemon} />}
    disabled
  >
    Lemon
  </MultiSelect.Option>,
  <MultiSelect.Option
    key='carrot'
    value='carrot'
    leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
    trailingSupportingText='4/6'
  >
    Carrot
  </MultiSelect.Option>,
  <MultiSelect.Divider key='divider1' />,
  <MultiSelect.Option
    key='egg'
    value='egg'
    leadingIcon={<FontAwesomeIcon icon={faEgg} />}
  >
    Egg
  </MultiSelect.Option>,
  <MultiSelect.Option
    key='fish'
    value='fish'
    leadingIcon={<FontAwesomeIcon icon={faFish} />}
  >
    Fish
  </MultiSelect.Option>,
  <MultiSelect.Divider key='divider2' />,
  <MultiSelect.Option
    key='pepperHot'
    value='pepperHot'
    leadingIcon={<FontAwesomeIcon icon={faPepperHot} />}
    headline='Yummy!'
  >
    Pepper Hot
  </MultiSelect.Option>,
];

const variants: Array<IComponentPresentation<IMultiSelectProps>> = [
  { legend: 'Filled', props: { variant: 'filled' } },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const useCases: Array<IComponentPresentation<IMultiSelectProps>> = [
  { legend: 'Basic', props: { children: options } },
  { legend: 'With Label', props: { children: options, label: 'Label' } },
  {
    legend: 'With Placeholder',
    props: { children: options, placeholder: 'Food' },
  },
  {
    legend: 'With Supporting Text',
    props: { children: options, supportingText: 'Choose your favorite food' },
  },
  {
    legend: 'With Default Value',
    props: { children: options, defaultValue: ['carrot', 'fish'] },
  },
  {
    legend: 'Controlled',
    props: { children: options, value: ['carrot', 'fish'] },
    component: ControlledMultiSelect,
  },
  {
    legend: 'Display Text',
    props: { children: pictureOptions },
  },
  {
    legend: 'Chips',
    props: { children: options },
    component: ControlledSelectWithChip,
  },
];

export const UseCases: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={MultiSelect}
      props={props}
      cols={variants}
      rows={useCases}
    />
  ),
  args: defaultArgs,
};

export default meta;
