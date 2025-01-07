import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import _every from 'lodash/every';
import _pickBy from 'lodash/pickBy';
import _values from 'lodash/values';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../store/reducers';
import {
  DispatchWorkflowUpdateType,
  WorkflowStep,
  updateWorkflow,
} from '../../store/actions/workflowActions';
import {
  DispatchAcknowledgementStateUpdateType,
  updateAcknowledgementState,
} from '../../store/actions/acknowledgementActions';
import { pageContent } from './pageContent';
import { AcknowledgementSection } from './AcknowledgementSection';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { ClientId, DispatchClientUpdate, updateClient } from '../../store/actions/clientActions';

interface OwnProps {}
interface StateProps {
  acknowledgementState: AcknowledgementStateInterface;
  workflow: WorkflowStep;
}

interface DispatchProps {
  dispatchAcknowledgementStateUpdate: DispatchAcknowledgementStateUpdateType;
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchClientUpdate: DispatchClientUpdate;
}
type Props = StateProps & DispatchProps & OwnProps;

const _AcknowledgementPage = ({
  acknowledgementState,
  dispatchAcknowledgementStateUpdate,
  workflow,
  dispatchWorkflowUpdate,
  dispatchClientUpdate
}: Props): JSX.Element => {
  

  const allAgreedTo = _every(
    _values(
      _pickBy(
        acknowledgementState,
        // @ts-ignore
        (val: boolean, id: AcknowledgementIdsEnum) => {
          // eslint-disable-next-line eqeqeq
          return id != AcknowledgementIdsEnum.confirmation;
        }
      )
    )
  );

  const Subtitle = styled.p`
    font-size: 20px;
    margin-bottom: 32px;
  `;

  const steps = pageContent;
  const { formatMessage } = useIntl();
  const acknowledgementIdsArray = Object.keys(AcknowledgementIdsEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => AcknowledgementIdsEnum[key as keyof typeof AcknowledgementIdsEnum]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.OVERVIEW) {
      dispatchWorkflowUpdate(WorkflowStep.SELECT_CLIENT);
    }
  };

  const setClientFxn = (clientId: ClientId) => {
    dispatchClientUpdate(clientId, 'execution');
  };

  const handleAccept = () => {   
    const isOneClick = sessionStorage.getItem('oneClick') === 'true';
    setClientFxn(isOneClick ? ClientId.STEREUM : ClientId.GETH);
    acknowledgementIdsArray.forEach((id) => {
      console.log(workflow);
      dispatchAcknowledgementStateUpdate(id, true);
    }); 
    dispatchWorkflowUpdate(WorkflowStep.SELECT_CLIENT);
  };

  const handleContinueClick = (id: AcknowledgementIdsEnum) => {
    dispatchAcknowledgementStateUpdate(id, true);
  };

  const handleGoBackClick = (id: AcknowledgementIdsEnum) => {
  };
  
  const AcknowledgementMessage = styled.div`
    margin-top: 20px;
    background: #ffdeb32e;
    border: 1px solid burlywood;
    padding: 30px;
    border-radius: 4px;
  `;

  const AcknowledgementFooter = styled.div`    
    padding: 30px;
  `;

  const FlexRowGap = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 30px;
  `;
  
  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Advisories' })}
    >
      <Subtitle>
        <FormattedMessage defaultMessage="Everything you should understand before becoming a validator." />
      </Subtitle>
      <Paper className="flex flex-column">
        <Accordion>
        {acknowledgementIdsArray.filter(value => value !== AcknowledgementIdsEnum.confirmation &&  value !== AcknowledgementIdsEnum.terminal).map((value) => (
          <AccordionItem title={steps[value].title}>          
              <AcknowledgementSection
                showTitle={false}
                handleContinueClick={handleContinueClick}
                handleGoBackClick={handleGoBackClick}
                handleSubmit={handleSubmit}
                allAgreedTo={allAgreedTo}
                title={steps[value].title}
                content={steps[value].content}
                acknowledgementId={value}
                acknowledgementText={steps[value].acknowledgementText}
              />     
          </AccordionItem>          
        ))}  
        </Accordion>
        <AcknowledgementFooter>
          <div>
            {steps[AcknowledgementIdsEnum.confirmation].content}
          </div>
          <AcknowledgementMessage>
            {steps[AcknowledgementIdsEnum.confirmation].acknowledgementText}
          </AcknowledgementMessage>
          <FlexRowGap>
            <Link
              to={routesEnum.selectClient}
              onClick={() => {
                handleAccept();
              }}
            >
              <Button
                rainbow
                width={300}
                label={formatMessage({ defaultMessage: 'I Accept' })}
              />
            </Link>
          </FlexRowGap>
        </AcknowledgementFooter>
      </Paper>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = (state: StoreState): StateProps => ({
  workflow: state.workflow,
  acknowledgementState: state.acknowledgementState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchAcknowledgementStateUpdate: (id, value) =>
    dispatch(updateAcknowledgementState(id, value)),
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
  dispatchClientUpdate: (
      clientId: ClientId,
      ethClientType: 'execution' | 'consensus'
    ) => {
      dispatch(updateClient(clientId, ethClientType));
    },
});

export const AcknowledgementPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_AcknowledgementPage);
