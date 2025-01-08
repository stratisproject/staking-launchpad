import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormNext, FormPrevious } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

import { routesEnum } from '../../Routes';

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 1rem;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const BoldGreen = styled.span`
  color: ${(p: { theme: any }) => p.theme.green.dark};
  font-size: 1.5rem;
  font-weight: bold;
  margin-inline-end: 10px;
`;

const StyledLink = styled(Link as any)`
  width: 100%;
`;

export const SelectModePage = () => {
  const { locale, formatMessage } = useIntl();
  const history = useHistory();

  const handleClick = (route: string, isOneClick: string) => {
    sessionStorage.setItem('oneClick', isOneClick);
  
    history.push(route);
  };

  const formArrow = React.useMemo(
    () =>
      locale === 'ar' ? (
        <FormPrevious size="large" />
      ) : (
        <FormNext size="large" />
      ),
    [locale]
  );
  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Select Setup Mode' })}
    >
      <div id="top" />
      <Subtitle>
        <FormattedMessage defaultMessage="Please select your setup mode" />        
      </Subtitle>
      <CardContainer>
        <StyledLink
          to={routesEnum.acknowledgementPage}
          inline
          isTextLink={false}
          onClick={() => handleClick(routesEnum.acknowledgementPage, 'true')}
        >
          <Card>
            <div>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Option 1" />
              </Heading>
              <BoldGreen>
                <FormattedMessage defaultMessage="One-Click Setup" />
              </BoldGreen>
            </div>
            {formArrow}
          </Card>
        </StyledLink>
        <StyledLink
          to={routesEnum.acknowledgementPage}
          inline
          isTextLink={false}
          onClick={() => handleClick(routesEnum.acknowledgementPage, 'false')}
        >
          <Card>
            <div>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Option 2" />
              </Heading>
              <BoldGreen>
                <FormattedMessage defaultMessage="Traditional Setup" />
              </BoldGreen>
            </div>
            {formArrow}
          </Card>
        </StyledLink>
      </CardContainer>    
      <Heading level={3} className="mt30">
        <FormattedMessage defaultMessage="One-Click Setup" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Ideal for those who want to get started quickly or have less technical experience" />
        <ul>
          <li>Automated installation and configuration</li>
          <li>Fewer manual steps</li>
          <li>Standardized deployment</li>
        </ul>
      </Text>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Traditional Setup" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="This method may be preferred by more experienced users who want granular control" />
        <ul>
          <li>Ethereum Staking Process</li>
          <li>Manual Node Configuration</li>
          <li>Greater Control</li>
        </ul>
      </Text>  
    </PageTemplate>
  );
};
