import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormattedMessage } from 'react-intl';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Alert } from '../../components/Alert';
import { Client } from './index';
import { ClientId } from '../../store/actions/clientActions';

const ClientDescriptionContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  background: #fcfcfc;
  border: 1px solid #ececec;
  padding: 1rem 2rem;
`;

type Props = {
  title?: string;
  clients: Array<Client>;
  currentClient: ClientId;
  setCurrentClient: (client: ClientId) => void;
  clientDetails: any;
  ethClientStep: string;
};

const SelectClientSection = ({
  title,
  clients,
  currentClient,
  setCurrentClient,
  clientDetails,
  ethClientStep,
}: Props): JSX.Element => (
  <Paper>    
    <Box className="flex flex-column space-between mt10">            
      <ClientDescriptionContainer>
        {clientDetails[currentClient]}
      </ClientDescriptionContainer>
      <Alert variant="warning" className="mt30 mb20">
        <Heading level={4} className="mb10">
          <FormattedMessage defaultMessage="Remember" />
        </Heading>
        <Text className="my10">
          <FormattedMessage defaultMessage="After client installation, ensure you are fully synced before submitting your staking deposit. This can take several hours." />{' '}
          <Link primary inline to="/checklist">
            <FormattedMessage defaultMessage="Validator checklist" />
          </Link>
        </Text>
      </Alert>
    </Box>
  </Paper>
);

export default SelectClientSection;
