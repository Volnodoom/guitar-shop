import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FooterSocialLinks } from '../../../const';
import Footer from './footer';

describe('Component: Footer', () => {
  it('render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/8-812-500-50-50/i)).toBeInTheDocument();
    expect(screen.getByText(/г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6./i)).toBeInTheDocument();
    expect(screen.getByText(/с 11:00 до 20:00/i)).toBeInTheDocument();

    expect(screen.getByLabelText(FooterSocialLinks[0].text)).toBeInTheDocument();
    expect(screen.getByLabelText(FooterSocialLinks[1].text)).toBeInTheDocument();
    expect(screen.getByLabelText(FooterSocialLinks[2].text)).toBeInTheDocument();
  });
});
