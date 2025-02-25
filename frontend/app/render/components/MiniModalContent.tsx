import { HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function MiniModalContent({
  children,
  ...props
}: ModalContentProps) {
  return (
    <>
      <Content {...props}>{children}</Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0rem;
  align-items: center;
  font-size: 14px;
  overflow: auto;
`;
