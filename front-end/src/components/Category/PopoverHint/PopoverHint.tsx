import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function PopoverHint() {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Click on any letter in the word to open it by sacrificing one point
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <i className="bi bi-info-circle-fill"></i>
    </OverlayTrigger>
  );
}

export default PopoverHint;
