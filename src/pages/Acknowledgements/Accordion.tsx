import React from 'react';

interface AccordionProps {
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div style={{ width: '100%'}}>{children}</div>;
};

export default Accordion;