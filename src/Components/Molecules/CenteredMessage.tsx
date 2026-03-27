// CenteredMessage.tsx
import TextComponent from "../Atoms/TextComponent"; // adjust the path as needed
import { colors } from "../../theme/colors";

type CenteredMessageProps = {
    message: string;
    color?: string;
    fontSize?: number;
};

const CenteredMessage = ({
    message,
    color = colors.brand.highlight,
    fontSize = 16,
}: CenteredMessageProps) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <TextComponent
                color={color}
                fontFamily="Inter"
                fontWeight={500}
                fontSize={fontSize}
                style={{ textAlign: "center" }}
                component="div"
            >
                {message}
            </TextComponent>
        </div>
    );
};

export default CenteredMessage;
