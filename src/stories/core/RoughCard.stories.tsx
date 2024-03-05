import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import RoughCard from '../../core/RoughCard';

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

const CardChildren = () => {
  return (
    <div>
      <h3 className="text-l font-bold mb-2">Card Children</h3>
      <p className="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero accusamus doloremque ex explicabo ipsa cumque qui quisquam corrupti perspiciatis aperiam. Dolorem atque optio perspiciatis pariatur. Totam inventore laboriosam nemo eaque.</p>
      <p className="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero accusamus doloremque ex explicabo ipsa cumque qui quisquam corrupti perspiciatis aperiam. Dolorem atque optio perspiciatis pariatur. Totam inventore laboriosam nemo eaque.</p>
    </div>
  )
}


export const Default: Story = {
  args: {
    children: CardChildren(),
    title: 'RoughCard Title',
  },
};
