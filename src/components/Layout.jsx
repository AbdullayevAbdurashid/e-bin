// src/components/Layout.jsx
import styled from 'styled-components';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px; // Mobile width on desktop
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  padding-bottom: 80px; // Space for bottom navigation
`;

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <LayoutContainer>
            <Main>{children}</Main>
            <Header />
        </LayoutContainer>
    );
};

export default Layout;