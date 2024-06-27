import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import gethBg from '../../../static/geth-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { PageTemplate } from '../../../components/PageTemplate';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { IS_GOERLI } from '../../ConnectWallet/web3Utils';
import StereumStep1 from '../../../static/stereum_step1.png';
import StereumStep2 from '../../../static/stereum_step2.png';
import StereumStep3 from '../../../static/stereum_step3.png';
import StereumStep4 from '../../../static/stereum_step4.png';
import StereumStep5 from '../../../static/stereum_step5.png';
import StereumStep6 from '../../../static/stereum_step6.png';
import StereumStep7 from '../../../static/stereum_step7.png';
// import { ClientDiversityWarning } from '../../../components/ClientDiversityWarning';

import { IS_MAINNET } from '../../../utils/envVars';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  max-width: 800px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

// eslint-disable-next-line no-unused-vars
export const StereumDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Stereum is an open-source toolkit designed to simplify the process of setting up and maintaining an Ethereum node. It helps users to decentralize the Ethereum network by making it easier to stake their own coins using their own machines. Stereum provides options for node-related protocols and supports one-click installation for various use cases." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Setup" />
      </SectionTitle>
      <Text className="mb20 mt10">
        <FormattedMessage defaultMessage="Make sure you do the following to get your execution client working properly." />
      </Text>
      {!IS_MAINNET && IS_GOERLI && (
        <>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on Auroria" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {auroria} to sync the Auroria testnet."
              values={{
                auroria: <Code className="mt20">--auroria</Code>,
              }}
            />
          </Text>
          <Link
            primary
            to="https://geth.stratisevm.com/docs/interface/command-line-options"
          >
            <FormattedMessage defaultMessage="Geth on Auroria documentation" />
          </Link>
        </>
      )}
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 1" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Rent a Server from a VPS Provider such as Hetzner, Digital Ocean etc." />
      </Text>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 2" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Enter your Server information. (we recommend using SSH Key and disabling password-based authentication)" />
      </Text>
      <ImageContainer>
        <Image src={StereumStep1} alt="Stereum_Step_2" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 3" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Select 1 Click Installation to simply configure your Server" />
      </Text>
      <ImageContainer>
        <Image src={StereumStep2} alt="Stereum_Step_3" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 4" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Choose the network" />
      </Text>
      <ImageContainer>
        <Image src={StereumStep3} alt="Stereum_Step_4" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 5" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="You can edit services here; we recommend leaving the defaults." />
      </Text>
      <ImageContainer>
        <Image src={StereumStep4} alt="Stereum_Step_5" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 6" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="The Stratis Launcher will now configure your server and prepare it to be a Stratis Validator. Depending on your server specifications, this will take a few minutes." />
      </Text>
      <ImageContainer>
        <Image src={StereumStep5} alt="Stereum_Step_6" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 7" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="Your server will now begin synchronizing with the Stratis Blockchain." />
      </Text>
      <ImageContainer>
        <Image src={StereumStep6} alt="Stereum_Step_7" />
      </ImageContainer>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="Step 8" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage defaultMessage="You can now add your validator keys, generated using the Wagyu Keygen on the Staking page" />
      </Text>
      <ImageContainer>
        <Image src={StereumStep7} alt="Stereum_Step_8" />
      </ImageContainer>
    </section>
  </>
);

export const Geth = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Geth' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={gethBg} />
        <StereumDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://geth.stratisevm.com/docs/">
            <FormattedMessage defaultMessage="Documentation on running Geth" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
