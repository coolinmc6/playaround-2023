import type { Meta, StoryObj } from '@storybook/react';

import RoughCard from '../../core/RoughCard';
import CardChildren from '../RoughCardChildren';

const meta = {
  title: 'Core/RoughCard',
  component: RoughCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoughCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero accusamus doloremque ex explicabo ipsa cumque qui quisquam corrupti perspiciatis aperiam. Dolorem atque optio perspiciatis pariatur. Totam inventore laboriosam nemo eaque.',
    title: 'RoughCard Title',
  },
};
