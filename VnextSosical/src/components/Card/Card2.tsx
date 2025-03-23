import React from 'react'
import styled from 'styled-components'

interface SimpleCardProps {
  children: React.ReactNode
  className?: string
}

const StyledCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 28rem;
`

const SimpleCard: React.FC<SimpleCardProps> = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>
}

export default SimpleCard
