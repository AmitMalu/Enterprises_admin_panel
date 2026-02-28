import TextComponent from "../Atoms/TextComponent";
import { capitalizeWords } from "../../Utils/utils";
import { BreadCrumbIcon } from "../../assets/Icons";
import { colors } from "../../theme/colors";

const BreadCrumb = ({
  type,
  text = "Management",
  color = colors.brand.highlight,
  gap = 2,
}: {
  type: string;
  text?: string;
  color?: string;
  gap?: number;
}) => (
  <TextComponent component="div" fontSize={12} fontFamily="Inter" fontWeight={400}>
    <div className={`flex gap-${gap}`}>
      <span style={{ color: color }}>{text}</span>
      <BreadCrumbIcon /> {capitalizeWords(type)}
    </div>
  </TextComponent>
);

export default BreadCrumb;
