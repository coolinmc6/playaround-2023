import type { Meta, StoryObj } from '@storybook/react';

import Table from '../../core/Table';

const meta = {
  title: 'Core/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerArray: ['Header 1', 'Header 2', 'Header 3'],
    data: [
      { 'Header 1': 'Data 1', 'Header 2': 'Data 2', 'Header 3': 'Data 3' },
      { 'Header 1': 'Data 1', 'Header 2': 'Data 2', 'Header 3': 'Data 3' },
      { 'Header 1': 'Data 1', 'Header 2': 'Data 2', 'Header 3': 'Data 3' },
    ],
  }
}
