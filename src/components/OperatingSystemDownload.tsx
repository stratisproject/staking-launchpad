import React from 'react';
import styled from 'styled-components';
import MacLogo from '../static/apple.svg';
import LinuxLogo from '../static/linux.svg';
import WindowsLogo from '../static/windows.svg';
import { ImageSelectionBox } from './ImageSelectionBox';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media only screen and (min-width: 980px) {
    padding: 0 80px;
  }

  @media only screen and (min-width: 1200px) {
    padding: 0 115px;
  }
`;

interface OSButtonProps {
  linuxDownload: string;
  windowsDownload: string;
  macDownload: string;
}

export const OperatingSystemDownload = ({
  linuxDownload,
  windowsDownload,
  macDownload
}: OSButtonProps) => {

  return (
    <Container className="flex">
      <ImageSelectionBox
        text="Linux"
        onClick={() => window.location.href = linuxDownload}
        isActive={false}
        src={LinuxLogo}
      />
      <ImageSelectionBox
        text="Windows"
        onClick={() => window.location.href = windowsDownload}
        isActive={false}
        src={WindowsLogo}
      />
      <ImageSelectionBox
        text="Mac"
        onClick={() => window.location.href = macDownload}
        isActive={false}
        src={MacLogo}
      />
    </Container>
  );
};
