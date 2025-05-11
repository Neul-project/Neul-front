import styled from "styled-components";

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;

export const ModalFormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;

export const ModalTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
`;

export const ModalInputDiv = styled.div`
  width: 100%;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 9px 9px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 9px 9px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
`;

export const ModalButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.pointGreen};
  border: none;
  padding: 9px 18px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
`;
