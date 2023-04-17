import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import classes from "./popover.module.css";

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
      <div className={classes.icon_container}>
        <i className="bi bi-lightbulb"></i>
      </div>
    </OverlayTrigger>
  );
}

export default PopoverHint;
