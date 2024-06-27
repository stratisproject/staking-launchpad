import React, { useState } from 'react';
import styled from 'styled-components';
import { Down, Up } from 'grommet-icons';

interface AccordionItemProps {
  title: JSX.Element;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const AccordionItemWrapper = styled.div`
    border: 1px solid #efefef;
    margin-bottom: 5px;
  `;

  const AccordionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    background: #f0fbff;
    font-weight: bold;
  `;

  const AccordionContent = styled.div`
    padding: 20px;
    border-top: 1px solid #efefef;
  `;

  const Arrow = styled.span`
    margin-left: 10px;
  `;

  return (
    <AccordionItemWrapper>
      <AccordionHeader onClick={toggleOpen}>
        {title}
        <Arrow>{isOpen ? <Up /> : <Down />}</Arrow>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionItemWrapper>
  );
};