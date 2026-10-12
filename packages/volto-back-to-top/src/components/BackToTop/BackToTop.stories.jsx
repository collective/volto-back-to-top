/**
 * BackToTop stories
 * @module components/BackToTop/BackToTop.stories
 */

import BackToTop from './BackToTop';

export default {
  title: 'Components/BackToTop',
  component: BackToTop,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', height: '200vh' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <BackToTop {...args} />;

export const Default = Template.bind({});
Default.args = {};
