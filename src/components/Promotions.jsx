// src/components/Promotions.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FiGift, FiAward, FiClock, FiTrendingUp } from 'react-icons/fi';

const Container = styled.div`
  padding: 16px;
  padding-top: 70px;
  max-width: 600px;
  margin: 0 auto;
`;

const PointsCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #FF6B4A 100%);
  color: white;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(252, 63, 29, 0.2);
`;

const PointsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PointsValue = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin: 16px 0;
`;

const PointsLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const LevelProgress = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  height: 8px;
  margin-top: 16px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: white;
    border-radius: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 24px 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const PromotionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PromotionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PromotionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

const PromotionPoints = styled.span`
  background: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const TransactionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TransactionPoints = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const Promotions = () => {
  const [userPoints] = useState(450);
  const [nextLevel] = useState(1000);

  const promotions = [
    {
      id: 1,
      title: 'Plastic Bottles Recycling',
      points: 10,
      description: 'Get Yandex Plus points for every plastic bottle recycled at Al-Fergani Smart Bin',
      type: 'plastic',
      endDate: '2024-12-31',
    },
    {
      id: 2,
      title: 'Metal Recycling Bonus',
      points: 15,
      description: 'Extra points for metal recycling at Central Market Smart Bin',
      type: 'metal',
      endDate: '2024-12-31',
    },
    {
      id: 3,
      title: 'Weekend Recycling Boost',
      points: '2x',
      description: 'Double points for all recycling on weekends at any Smart Bin in Fergana',
      type: 'all',
      endDate: '2024-12-31',
    },
    {
      id: 4,
      title: 'University Challenge',
      points: 100,
      description: 'Earn bonus points by recycling 20 items at University Park Smart Bin',
      type: 'challenge',
      endDate: '2024-12-31',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Plastic Bottles',
      points: 30,
      location: 'Al-Fergani Smart Bin',
      date: '2024-01-09T07:30:00Z',
    },
    {
      id: 2,
      type: 'Metal Cans',
      points: 45,
      location: 'Central Market Smart Bin',
      date: '2024-01-08T15:45:00Z',
    },
  ];

  return (
    <Container>
      <PointsCard>
        <PointsHeader>
          <PointsLabel>Your Yandex Plus Points</PointsLabel>
          <FiAward size={24} />
        </PointsHeader>
        <PointsValue>{userPoints}</PointsValue>
        <PointsLabel>
          {nextLevel - userPoints} points until next level
        </PointsLabel>
        <LevelProgress progress={(userPoints / nextLevel) * 100} />
      </PointsCard>

      <SectionTitle>
        <FiGift />
        Active Promotions
      </SectionTitle>
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.id}>
          <PromotionHeader>
            <PromotionTitle>{promotion.title}</PromotionTitle>
            <PromotionPoints>+{promotion.points} points</PromotionPoints>
          </PromotionHeader>
          <p>{promotion.description}</p>
          <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
            <FiClock style={{ verticalAlign: 'middle' }} /> Valid until {new Date(promotion.endDate).toLocaleDateString()}
          </small>
        </PromotionCard>
      ))}

      <SectionTitle>
        <FiTrendingUp />
        Recent Activity
      </SectionTitle>
      {recentTransactions.map((transaction) => (
        <TransactionCard key={transaction.id}>
          <TransactionInfo>
            <div>
              <div>{transaction.type}</div>
              <small style={{ color: '#666' }}>
                {transaction.location} • {new Date(transaction.date).toLocaleDateString()}
              </small>
            </div>
          </TransactionInfo>
          <TransactionPoints>+{transaction.points} points</TransactionPoints>
        </TransactionCard>
      ))}
    </Container>
  );
};

export default Promotions;