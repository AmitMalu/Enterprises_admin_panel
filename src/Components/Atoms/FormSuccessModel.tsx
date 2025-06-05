import { Modal, Paper } from "@mantine/core";
import React from "react";
import TextComponent from "./TextComponent";
import checkSvg from "../../assets/Icons/checkIcon.gif";

interface FormSuccessModelProps {
  opened: boolean;
  onClose: () => void;
}

const FormSuccessModel: React.FC<FormSuccessModelProps> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{
        opacity: 0.4,
        blur: 2,
      }}
      padding={"xl"}
      radius="md"
      size="lg"
    >
      <Paper p="xl">
        <div className="flex flex-col items-center justify-center">
          <img src={checkSvg} alt="Success" className="w-24 h-24" />
        </div>

        <TextComponent
          component="div"
          fontFamily="inter"
          fontSize={32}
          weight={500}
          align="center"
          color="#47AF0C"
          style={{ margin: "2rem" }}
        >
          You're good to go!
        </TextComponent>

        <TextComponent
          component="div"
          fontFamily="inter"
          fontSize={18}
          weight={500}
          align="center"
          color="#3D3D3D"
        >
          Submission received. We’ll get back to you shortly.
        </TextComponent>
      </Paper>
    </Modal>
  );
};

export default FormSuccessModel;
