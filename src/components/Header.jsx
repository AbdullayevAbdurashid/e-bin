// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
    MdMap,
    MdDeleteOutline,
    MdStars,
    MdRecycling
} from 'react-icons/md';

const NavigationBar = styled.nav`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 28px;
  padding: 4px 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 8px;
  z-index: 1000;
  max-width: 420px;
  width: calc(100% - 32px);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  color: ${({ active, theme }) =>
        active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  flex: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => active ? '4px' : '0'};
    height: 4px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const Header = () => {
    const location = useLocation();

    return (
        <NavigationBar>
            <NavItem to="/" active={location.pathname === '/' ? 1 : 0}>
                <IconWrapper>
                    <MdMap />
                </IconWrapper>
                <Label>Map</Label>
            </NavItem>
            <NavItem to="/bins" active={location.pathname === '/bins' ? 1 : 0}>
                <IconWrapper>
                    <MdRecycling />
                </IconWrapper>
                <Label>Bins</Label>
            </NavItem>
            <NavItem to="/promotions" active={location.pathname === '/promotions' ? 1 : 0}>
                <IconWrapper>
                    <MdStars />
                </IconWrapper>
                <Label>Points</Label>
            </NavItem>
        </NavigationBar>
    );
};

export default Header;