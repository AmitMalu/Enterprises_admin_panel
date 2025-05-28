import TextComponent from "../Atoms/TextComponent";
import { capitalizeWords } from "../../Utils/utils";

const BreadCrumb = ({ type, text = "Management" }: { type: string, text? : string }) => (
  <TextComponent fontSize={12} fontFamily="Inter" fontWeight={400}>
    <span style={{ color: "#CA4343" }}>{text}</span> &gt;{" "}
    {capitalizeWords(type)} Form
  </TextComponent>
);

export default BreadCrumb;
