// Import libraries
import React, { useEffect, useState, useMemo } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box, CheckBox } from 'grommet';
import { FormattedMessage, useIntl } from 'react-intl';
import { toChecksumAddress } from 'ethereumjs-util';
// Components
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import WagyuStep1 from '../../static/wagyu_step_1.png';
import WagyuStep2 from '../../static/wagyu_step_2.png';
import WagyuStep3 from '../../static/wagyu_step_3.png';
import WagyuStep4 from '../../static/wagyu_step_4.png';
import WagyuStep5 from '../../static/wagyu_step_5.png';
import WagyuStep6 from '../../static/wagyu_step_6.png';
import WagyuStep7 from '../../static/stereum_step7.png';
// Store management
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { StoreState } from '../../store/reducers';
// Utilities
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
// Images
// Routes
import { routesEnum } from '../../Routes';
import { OperatingSystemDownload } from '../../components/OperatingSystemDownload';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 10px;
`;

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

const ClientDescriptionContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  background: #fcfcfc;
  border: 1px solid #ececec;
  padding: 1rem 2rem;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _GenerateKeysPage = ({
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(workflow > WorkflowStep.GENERATE_KEY_PAIRS);
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const isValidWithdrawalAddress = useMemo<boolean>(
    () => /^0x[0-9a-f]{40}$/i.test(withdrawalAddress),
    [withdrawalAddress]
  );

  useEffect(() => {
    if (!isValidWithdrawalAddress) return;
    setWithdrawalAddress(toChecksumAddress(withdrawalAddress));
  }, [isValidWithdrawalAddress, withdrawalAddress]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.GENERATE_KEY_PAIRS) {
      dispatchWorkflowUpdate(WorkflowStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  if (workflow < WorkflowStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Generate key pairs' })}
    >
      <Paper>
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="What is your current operating system?" />
        </Heading>
        <Text className="mt20 mb40">
          <FormattedMessage
            defaultMessage="Choose the OS of the computer you're currently using. This will be the
              computer you use to generate your keys. It doesn't need to be the OS
              you want to use for your node."
          />
        </Text>       
        <OperatingSystemDownload
          linuxDownload='https://github.com/stratisproject/wagyu-key-gen/releases/download/v0.1.1/Wagyu.Key.Gen-0.1.1.AppImage'
          windowsDownload='https://github.com/stratisproject/wagyu-key-gen/releases/download/v0.1.1/Wagyu.Key.Gen.0.1.1.exe'
          macDownload='https://github.com/stratisproject/wagyu-key-gen/releases/download/v0.1.1/Wagyu.Key.Gen-0.1.1.dmg'
        />
      </Paper>

      <Paper className="mt20">
        <Box className="flex flex-column space-between mt10">
          <ClientDescriptionContainer>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="The Stratis Wagyu Keygen tool can be used to create validator keys, including the related keystore files and deposit data files. Keystore files can be imported into your validator client via the Stratis Launcher. The deposit data file can be used to perform the validator deposit on the launchpad site. It can also be used to create a signature to add a withdrawal address to your validator."
              />
            </Text>
            <Heading level={3} className="mt20" size="small">
              <FormattedMessage defaultMessage="Step 1" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="When running the Wagyu Key Gen it will check for an active internet connection. Ideally, the keys should be generated on an offline machine to minimise any risk of your recovery phrase being obtained through malicious activity."
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep1} alt="WagyuStep1" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 2" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Select the Network you want to create Validator Keys for"
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep2} alt="WagyuStep2" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 3" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="After confirming you have recorded your Recovery Phrase, enter the number of Validator Keys you wish to create. You should also define your Ethereum Withdrawal Address; this is the address where the stake amount will be withdrawn when exiting your validator."
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep3} alt="WagyuStep3" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 4" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Select a location for the keys to be stored on your local machine."
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep4} alt="WagyuStep4" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 5" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Your keys have now been successfully create and stored in the defined directory."
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep5} alt="WagyuStep5" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 6" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Locate the keys and confirm you have a deposit_data-xxxxxxxxxx.json file. This will be needed to make the deposit for your validator(s). "
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep6} alt="WagyuStep6" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 6" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Your keys (keystore-m_xxxxx_xxxx_x_x_x-xxxxxxxxx.json) can now be imported into the Stratis Node launcher. "
              />
            </Text>
            <ImageContainer>
              <Image src={WagyuStep7} alt="WagyuStep7" />
            </ImageContainer>
            <Heading level={3} size="small">
              <FormattedMessage defaultMessage="Step 8" />
            </Heading>
            <Text>
              <p className="mt20">
                Progress to the next page to upload your <i>deposit_data-xxxxxxxxxx.json</i> to make the deposits for your validator keys. Please note that once the deposits are made, your validator may take up to 24 hours to become active.  
              </p>
              <p className="mt20">
                You will need the MetaMask (<a href='https://metamask.io/'>https://metamask.io/</a>) extension installed with a wallet that contains the correct STRAX balance before you can progress to make deposits for your validator(s).
              </p>
            </Text>
          </ClientDescriptionContainer>
        </Box>
      </Paper>

      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label={
            <Text>
              <FormattedMessage defaultMessage="I am keeping my key(s) safe and have written down my mnemonic phrase." />
            </Text>
          }
        />
      </Paper>

      <ButtonContainer>
        <Link to={routesEnum.selectClient}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.uploadValidatorPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!mnemonicAcknowledgementChecked}
            label={formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </ButtonContainer>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (workflowStep: WorkflowStep) => {
    dispatch(updateWorkflow(workflowStep));
  },
});

export const GenerateKeysPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_GenerateKeysPage);
