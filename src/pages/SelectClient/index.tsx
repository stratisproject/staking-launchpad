import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _shuffle from 'lodash/shuffle';
import { StoreState } from '../../store/reducers';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import SelectClientSection from './SelectClientSection';
import SelectClientButtons from './SelectClientButtons';
import { PrysmDetails } from '../Clients/Consensus/Prysm';
// import { GethDetails } from '../Clients/Execution/Geth';
import { StereumDetails } from '../Clients/Execution/Stereum';
import PrysmaticCircle from '../../static/prysmatic-labs-circle.png';
// import GethCircle from '../../static/gethereum-mascot-circle.png';
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

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
  chosenClients: clientState;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchClientUpdate: DispatchClientUpdate;
}
type Props = StateProps & DispatchProps & OwnProps;

const clientDetails = {
  [ClientId.PRYSM]: <PrysmDetails shortened />,
  [ClientId.STEREUM]: <StereumDetails />
};

export type Client = {
  clientId: ClientId;
  name: string;
  imgUrl: string;
  language?: any;
};

// define and shuffle the clients
const ethClients: {
  [ethClientType: string]: Array<Client>;
} = {
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
};

const _SelectClientPage = ({
  workflow,
  dispatchWorkflowUpdate,
  chosenClients,
  dispatchClientUpdate,
}: Props): JSX.Element => {
  // set the default the eth version to 1 on initial render
  const [ethClientStep, setEthClientStep] = useState<'execution' | 'consensus'>(
    'execution'
  );

  const { formatMessage } = useIntl();

  // filter the options based on the eth version the user is on
  const clientOptions = React.useMemo(() => ethClients[ethClientStep], [
    ethClientStep,
  ]);

  // memoize the chosen client by step
  const selectedClient: ClientId = React.useMemo(
    () =>
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

  return (
    <WorkflowPageTemplate title={title}>
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
