import React from 'react';
import styled from 'styled-components';

// Styled container for the points display
const PointsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #E1BEE7; /* Adjust the color to match the screenshot */
  border-radius: 20px; /* Rounded corners */
  padding: 5px 10px;
`;

// Styled points text
const PointsText = styled.span`
  font-size: 16px;
  color: #5E35B1; /* Adjust the text color to match the screenshot */
  font-weight: bold;
  margin-left: 5px;
`;

// Placeholder component for the YandexPlus logo
const YandexPlusLogo = styled.div`
  width: 24px;
  height: 24px;
  background-color: #9575CD; /* Adjust background color for the logo */
  border-radius: 50%; /* Circular shape */
`;

// Component that puts it all together
const PointsDisplay = ({ points }) => (
    <PointsContainer>
        <YandexPlusLogo />
        <PointsText>{points} points</PointsText>
    </PointsContainer>
);

export default PointsDisplay;
