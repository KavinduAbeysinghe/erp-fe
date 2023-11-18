import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

interface ActionButtonProps {
  tooltip: string;
  icon: any;
  handleClick: () => void;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <Tooltip title={props.tooltip}>
      <FontAwesomeIcon
        fontSize={"large"}
        icon={props.icon}
        onClick={props.handleClick}
        style={{
          cursor: "pointer",
          marginLeft: 5,
          marginRight: 5,
          color: "gray",
          verticalAlign: "center",
        }}
      />
    </Tooltip>
  );
};

export default ActionButton;
