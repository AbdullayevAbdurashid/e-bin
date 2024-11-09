// src/components/Map.jsx
import { useState, useEffect } from 'react';
import { YMaps, Map as YandexMap, Placemark, ZoomControl, GeolocationControl } from '@pbe/react-yandex-maps';
import styled from 'styled-components';
import { MdNavigation, MdInfo, MdMyLocation, MdLocationOn } from 'react-icons/md';

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const PointsDisplay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: white;
  border-radius: 52px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const YandexPlusLogo = styled.div`
  color: #000;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: 'Plus';
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
`;



const LocationButton = styled.button`
  position: absolute;
  bottom: 100px;
  right: 16px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BinInfoCard = styled.div`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: calc(100% - 32px);
  max-width: 320px;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease;
  
  ${({ hidden }) => hidden && `
    transform: translate(-50%, 200%);
  `}
`;

const BinTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const BinDetails = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
`;

const MaterialsList = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
  flex-wrap: wrap;
`;

const MaterialChip = styled.span`
  background: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
`;

const FillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: ${({ level }) =>
        level > 80 ? '#FF3B30' :
            level > 50 ? '#FF9500' : '#34C759'};
`;

const NavigateButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 12px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const MapComponent = () => {
    const [selectedBin, setSelectedBin] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const [points] = useState(450); // This should come from your state management

    const bins = [
        {
            id: 1,
            name: 'Smart Bin - Al-Fergani',
            location: [40.378582, 71.786201],
            fillLevel: 75,
            address: 'Al-Fergani Street, Fergana',
            materials: ['plastic', 'metal', 'paper']
        },
        {
            id: 2,
            name: 'Smart Bin - Central Market',
            location: [40.382914, 71.783699],
            fillLevel: 45,
            address: 'Central Market Area, Fergana',
            materials: ['plastic', 'metal']
        },
        {
            id: 3,
            name: 'Smart Bin - Park',
            location: [40.379151, 71.791090],
            fillLevel: 90,
            address: 'Victory Park, Fergana',
            materials: ['plastic', 'paper']
        },
        {
            id: 3,
            name: 'Smart Bin -  Politex',
            location: [40.42189154289397, 71.771902995875],
            fillLevel: 90,
            address: 'Victory Park, Fergana',
            materials: ['plastic', 'paper']
        }
    ];

    const handleBinClick = (bin) => {
        setSelectedBin(bin);
    };

    const handleNavigate = () => {
        if (selectedBin) {
            window.open(
                `https://yandex.com/maps/?rtext=~${selectedBin.location[0]},${selectedBin.location[1]}&rtt=auto`
            );
        }
    };

    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(location);
                    mapRef?.setCenter(location, 15);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    };

    return (
        <MapContainer>
            <PointsDisplay>
                <i> {points}</i>

                <img src='/plus.png' className='plus_logo' />
            </PointsDisplay>

            <YMaps query={{
                apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
                lang: 'en_US'
            }}>
                <YandexMap
                    defaultState={{
                        center: [40.378582, 71.786201], // Fergana center
                        zoom: 14,
                    }}
                    width="100%"
                    height="100%"
                    options={{
                        suppressMapOpenBlock: true
                    }}
                    instanceRef={setMapRef}
                >
                    <ZoomControl options={{ position: { right: 10, top: 10 } }} />

                    {bins.map((bin) => (
                        <Placemark
                            key={bin.id}
                            geometry={bin.location}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'bin-icons/point.png', // Using the single PNG file
                                iconImageSize: [64, 64], // Adjust size based on your PNG
                                iconImageOffset: [-16, -16] // Center the icon
                            }}
                            onClick={() => handleBinClick(bin)}
                        />
                    ))}

                    {userLocation && (
                        <Placemark
                            geometry={userLocation}
                            options={{
                                preset: 'islands#blueCircleDotIcon'
                            }}
                        />
                    )}
                </YandexMap>
            </YMaps>

            <LocationButton onClick={getMyLocation}>
                <MdMyLocation />
            </LocationButton>

            <BinInfoCard hidden={!selectedBin}>
                {selectedBin && (
                    <>
                        <BinTitle>{selectedBin.name}</BinTitle>
                        <BinDetails>{selectedBin.address}</BinDetails>
                        <MaterialsList>
                            {selectedBin.materials.map((material) => (
                                <MaterialChip key={material}>{material}</MaterialChip>
                            ))}
                        </MaterialsList>
                        <FillLevel level={selectedBin.fillLevel}>
                            <MdInfo />
                            Fill Level: {selectedBin.fillLevel}%
                        </FillLevel>
                        <NavigateButton onClick={handleNavigate}>
                            <MdNavigation />
                            Navigate to Bin
                        </NavigateButton>
                    </>
                )}
            </BinInfoCard>
        </MapContainer>
    );
};

export default MapComponent;