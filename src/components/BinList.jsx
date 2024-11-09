// src/components/BinList.jsx
import styled from 'styled-components';
import { FiNavigation2, FiTrash2, FiBarChart2 } from 'react-icons/fi';

const Container = styled.div`
  padding: 16px;
  padding-bottom: 80px;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 16px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BinCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  
  ${({ fillLevel }) => fillLevel > 80 && `
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
  `}
`;

const BinHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 12px;
    font-size: 24px;
  }
`;

const FillLevel = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  margin: 12px 0;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ level }) => level}%;
    background: ${({ theme, level }) =>
    level > 80 ? theme.colors.primary : '#4CAF50'};
    transition: width 0.3s ease;
  }
`;

const ActionButton = styled.button`
  background: ${({ theme, primary }) => primary ? theme.colors.primary : 'white'};
  color: ${({ primary }) => primary ? 'white' : '#333'};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &:active {
    transform: scale(0.98);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  margin-top: 12px;
`;

const BinList = () => {
  const bins = [
    {
      id: 1,
      location: [40.378582, 71.786201], // Fergana city center
      fillLevel: 75,
      type: 'Smart Bin',
      address: 'Al-Fergani street, Fergana',
      materials: ['plastic', 'metal'],
      lastEmptied: '2024-01-08T10:30:00Z',
    },
    {
      id: 2,
      location: [40.377211, 71.783462], // Near Fergana State University
      fillLevel: 45,
      type: 'Smart Bin',
      address: 'University Street, Fergana State University',
      materials: ['plastic', 'paper'],
      lastEmptied: '2024-01-08T09:15:00Z',
    },
    {
      id: 3,
      location: [40.379845, 71.789632], // Near Central Park
      fillLevel: 90,
      type: 'Smart Bin',
      address: 'Central Park, Fergana',
      materials: ['plastic', 'metal', 'paper'],
      lastEmptied: '2024-01-08T08:00:00Z',
    }
  ];

  const handleNavigate = (location) => {
    // Open Yandex Maps navigation
    window.open(`https://yandex.com/maps/?rtext=~${location[0]},${location[1]}&rtt=auto`, '_blank');
  };

  return (
    <Container>
      <SearchBar placeholder="Search bins by location..." />

      {bins.map((bin) => (
        <BinCard key={bin.id} fillLevel={bin.fillLevel}>
          <BinHeader>
            <FiTrash2 />
            <div>
              <h3>{bin.type}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{bin.address}</p>
            </div>
          </BinHeader>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiBarChart2 />
            <span>Fill Level:</span>
            <FillLevel level={bin.fillLevel} />
            <span>{bin.fillLevel}%</span>
          </div>

          <div style={{ margin: '12px 0' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Accepts: {bin.materials.join(', ')}
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Last Emptied: {new Date(bin.lastEmptied).toLocaleDateString()}
            </p>
          </div>

          <ActionButtons>
            <ActionButton
              primary
              onClick={() => handleNavigate(bin.location)}
            >
              <FiNavigation2 /> Navigate
            </ActionButton>
            <ActionButton>
              <FiTrash2 /> Details
            </ActionButton>
          </ActionButtons>
        </BinCard>
      ))}
    </Container>
  );
};

export default BinList;