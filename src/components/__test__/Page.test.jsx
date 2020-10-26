import React from 'react';
import { render } from '@testing-library/react';
import Page from '../Page';
import ReduxProvider from '../../../jest.provider';

const bodyText = 'Hello World!';
const childElement = <div id="dumy-child">{bodyText}</div>;

describe('Page', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <ReduxProvider>
        <Page>{childElement}</Page>
      </ReduxProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render header and container with correct child', () => {
    const { container } = render(
      <ReduxProvider>
        <Page>{childElement}</Page>
      </ReduxProvider>
    );
    expect(container.querySelector('.MuiAppBar-root')).toBeInTheDocument();
    expect(container.querySelector('#dumy-child')).toBeInTheDocument();
    expect(container.querySelector('#dumy-child')).toHaveTextContent(bodyText);
  });
});
