import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _shuffle from 'lodash/shuffle';
import { StoreState } from '../../store/reducers';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import SelectClientSection from './SelectClientSection';
import SelectClientButtons from './SelectClientButtons';
import SelectClientSectionManual from './SelectClientSectionManual';
import SelectClientButtonsManual from './SelectClientButtonsManual';
import { PrysmDetails } from '../Clients/Consensus/Prysm';
// import { GethDetails } from '../Clients/Execution/Geth';
import { StereumDetails } from '../Clients/Execution/Stereum';
import PrysmaticCircle from '../../static/prysmatic-labs-circle.png';
import GethCircle from '../../static/gethereum-mascot-circle.png';
import StereumLogo from '../../static/stereum_logo_circle.png';
import { FormattedMessage } from 'react-intl';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import {
  DispatchClientUpdate,
  updateClient,
  ClientId,
} from '../../store/actions/clientActions';
import { clientState } from '../../store/reducers/clientReducer';
import { useIntl } from 'react-intl';
import { OperatingSystemDownload } from '../../components/OperatingSystemDownload';
import styled from 'styled-components';
import { GethDetails } from '../Clients/Execution/Geth';

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
  chosenClients: clientState;
}

export type Client = {
  clientId: ClientId;
  name: string;
  imgUrl: string;
  language?: any;
};

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchClientUpdate: DispatchClientUpdate;
}
type Props = StateProps & DispatchProps & OwnProps;

const _SelectClientPage = ({
  workflow,
  dispatchWorkflowUpdate,
  chosenClients,
  dispatchClientUpdate,
}: Props): JSX.Element => {

  const isOneClick = sessionStorage.getItem('oneClick') === 'true';

  const clientDetails = isOneClick 
    ? {
        [ClientId.PRYSM]: <PrysmDetails shortened />,
        [ClientId.STEREUM]: <StereumDetails />
      } 
    : {
      [ClientId.PRYSM]: <PrysmDetails shortened />,
      [ClientId.GETH]: <GethDetails />
      };

  // define and shuffle the clients
  const ethClients: {
    [ethClientType: string]: Array<Client>;
  } = isOneClick ? {
    execution: _shuffle([
      {
        clientId: ClientId.STEREUM,
        name: 'Stereum',
        imgUrl: StereumLogo,
        language: 'JS',      
      }
    ]),
    consensus: _shuffle([
      {
        clientId: ClientId.PRYSM,
        name: 'Prysm',
        imgUrl: PrysmaticCircle,
        language: 'Go',
      }
    ]),
  } : {
    execution: _shuffle([
      {
        clientId: ClientId.GETH,
        name: 'Geth',
        imgUrl: GethCircle,
        language: 'Go',      
      }
    ]),
    consensus: _shuffle([
      {
        clientId: ClientId.PRYSM,
        name: 'Prysm',
        imgUrl: PrysmaticCircle,
        language: 'Go',
      }
    ]),
  };

  // set the default the eth version to 1 on initial render  
  const [ethClientStep, setEthClientStep] = useState<'execution' | 'consensus'>(
    'execution'
  );

  const { formatMessage } = useIntl();

  // filter the options based on the eth version the user is on
  const clientOptions = React.useMemo(() => ethClients[ethClientStep], [
    ethClients,
    ethClientStep,
  ]);

  // memoize the chosen client by step
  const selectedClient: ClientId = React.useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      ethClientStep === 'execution'
        ? chosenClients.executionClient
        : chosenClients.consensusClient,
    [ethClientStep, chosenClients]
  );

  const setClientFxn = (clientId: ClientId) => {
    dispatchClientUpdate(clientId, ethClientStep);
  };

  React.useEffect(() => {
    const header = document.getElementsByTagName('header')[0];

    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ethClientStep]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SELECT_CLIENT) {
      dispatchWorkflowUpdate(WorkflowStep.GENERATE_KEY_PAIRS);
    }
  };

  if (workflow < WorkflowStep.SELECT_CLIENT) {
    return routeToCorrectWorkflowStep(workflow);
  }

  const title = formatMessage(
    {
      defaultMessage: `Client Setup`,
      description:
        '{ethClientType} injects "execution" or "consensus" depending on step',
    },
    {
      ethClientType:
        ethClientStep === 'execution'
          ? formatMessage({ defaultMessage: 'execution' })
          : formatMessage({ defaultMessage: 'consensus' }),
    }
  );

  const List = styled.ul`
    font-family: 'Maison Neue', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 300;
    color: #0F2A43;
  `;

  return (
    <>
      {isOneClick ? (
        <WorkflowPageTemplate title='Introduction'>      
          <Paper className="mb20">
            <Text className="mt10 mb20">
              <FormattedMessage
                defaultMessage="The Stratis Launchpad will guide you through the steps of operating a Stratis Validator. There are three main components to this process:"
              />
            </Text>
            <List>
              <li><b>Client Setup</b> - Software is required to run a Stratis Validator, to simplify this management, Stratis has introduced the Stratis Launcher. The Stratis Launcher configures your remote Linux-based host and prepares it for operating as a Stratis Validator.</li>
              <li><b>Generate Keys</b> - To run a Stratis Validator, you must create “Validator Keys”. The key generation process is simplified by using the Wagyu Keygen tool.</li>
              <li><b>Validator Deposit</b> - Once you have configured your client and generated your keys, you need to make a deposit of 20,000 STRAX for each validator. These deposits can be done safely and securely through the Stratis Launchpad.</li>
            </List>
            <Text className="mt20 mb10">
              <FormattedMessage
                defaultMessage="To get started, choose your Operating System below to download the Stratis Launcher and begin setting up your validator."
              />
            </Text>
          </Paper>
          <Heading level={2} size="medium" color="blueDark" className="mb20">
            {title}
          </Heading>
          <Paper className="mb20">
            <Heading level={2} size="small" color="blueMedium">
              <FormattedMessage defaultMessage="What is your current operating system?" />
            </Heading>
            <Text className="mt20 mb40">
              <FormattedMessage
                defaultMessage="Choose the OS of the computer you're currently using. This will be the computer you use to configure the server that will run your node to be the OS you want to use for your node."
              />
            </Text>       
            <OperatingSystemDownload
              linuxDownload='https://github.com/stratisproject/stratis-node/releases/download/v1.0/Stratis-Launcher-1.0.0.AppImage'
              windowsDownload='https://github.com/stratisproject/stratis-node/releases/download/v1.0/Stratis-Launcher-Setup-1.0.0.exe'
              macDownload='https://github.com/stratisproject/stratis-node/releases/download/v1.0/Stratis-Launcher-1.0.0.dmg' />
          </Paper>

          <SelectClientSection
            title={formatMessage(
              {
                defaultMessage:
                  'Choose your {ethClientType} client and set up a node',
                description:
                  '{ethClientType} is either "execution" or "consensus", depending on which step user is on',
              },
              {
                ethClientType:
                  ethClientStep === 'execution'
                    ? formatMessage({ defaultMessage: 'execution' })
                    : formatMessage({ defaultMessage: 'consensus' }),
              }
            )}
            clients={clientOptions}
            currentClient={selectedClient}
            setCurrentClient={setClientFxn}
            clientDetails={clientDetails}
            ethClientStep={ethClientStep}
          />
          <SelectClientButtons
            updateStep={setEthClientStep}
            ethClientStep={ethClientStep}
            handleSubmit={handleSubmit}
            currentClient={selectedClient}
          />
        </WorkflowPageTemplate>
      ) : (
        <WorkflowPageTemplate title={title}>
          <SelectClientSectionManual
            title={formatMessage(
              {
                defaultMessage:
                  'Choose your {ethClientType} client and set up a node',
                description:
                  '{ethClientType} is either "execution" or "consensus", depending on which step user is on',
              },
              {
                ethClientType:
                  ethClientStep === 'execution'
                    ? formatMessage({ defaultMessage: 'execution' })
                    : formatMessage({ defaultMessage: 'consensus' }),
              }
            )}
            clients={clientOptions}
            currentClient={selectedClient}
            setCurrentClient={setClientFxn}
            clientDetails={clientDetails}
            ethClientStep={ethClientStep}
          />
          <SelectClientButtonsManual
            updateStep={setEthClientStep}
            ethClientStep={ethClientStep}
            handleSubmit={handleSubmit}
            currentClient={selectedClient}
          />
        </WorkflowPageTemplate>
      )}
    </>
  );
};

const mapStateToProps = ({ workflow, client }: StoreState): StateProps => ({
  workflow,
  chosenClients: client,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchClientUpdate: (
    clientId: ClientId,
    ethClientType: 'execution' | 'consensus'
  ) => {
    dispatch(updateClient(clientId, ethClientType));
  },
  dispatchWorkflowUpdate: (step: WorkflowStep) => {
    dispatch(updateWorkflow(step));
  },
});

export const SelectClientPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SelectClientPage);
