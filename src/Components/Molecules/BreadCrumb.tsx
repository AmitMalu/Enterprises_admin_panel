import TextComponent from "../Atoms/TextComponent";
import { capitalizeWords } from "../../Utils/utils";

const BreadCrumb = ({ type }: { type: string }) => (
  <TextComponent fontSize={12} fontFamily="Inter" fontWeight={400}>
    <span style={{ color: "#CA4343" }}>Management</span> &gt;{" "}
    {capitalizeWords(type)} Form
  </TextComponent>
);

export default BreadCrumb;
