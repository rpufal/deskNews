
import { render } from '@testing-library/react';
import  Card  from '../components/Card';
import '@testing-library/jest-dom/extend-expect';


describe('Card', () => {
    const defaultProps = {
        image: {
          alt: 'Test Example Image',
          src: "https://infra-cloudfront-talkdeskcom.svc.talkdeskapp.com/talkdesk_com/chatgpt-contact-center-ethics-435x290.png",
        },
        label: {
          text: 'Example Label',
        },
        title: 'The Perks of Testing',
        author: {
          name: 'JR Tolkien',
        },
        date: '2023-04-07',
      };
  it('renders the component with the default testing props', () => {
    const { getByAltText, getByText } = render(<Card {...defaultProps}/>);
    expect(getByAltText('Test Example Image')).toBeInTheDocument();
    expect(getByAltText('Test Example Image')).toHaveAttribute(
      'src',
      'https://infra-cloudfront-talkdeskcom.svc.talkdeskapp.com/talkdesk_com/chatgpt-contact-center-ethics-435x290.png'
    );
    expect(getByText('Example Label')).toBeInTheDocument();
    expect(getByText('The Perks of Testing')).toBeInTheDocument();
    expect(getByText('JR Tolkien - 2023-04-07')).toBeInTheDocument();
  });


  it('handles the missed image alt text', () => {
    const props = { ...defaultProps };
    delete props.image.alt;
    const { queryByAltText } = render(<Card {...props} />);
    expect(queryByAltText('Test Example Image')).not.toBeInTheDocument();
  });

  it('handles missed label text', () => {
    const props = { ...defaultProps };
    delete props.label.text;
    const { queryByText } = render(<Card {...props} />);
    expect(queryByText('Example Label')).not.toBeInTheDocument();
  });

  it('handles missing author name', () => {
    const props = { ...defaultProps };
    delete props.author.name;
    const { queryByText } = render(<Card {...props} />);
    expect(queryByText('JR Tolkien')).not.toBeInTheDocument();
  });
});
