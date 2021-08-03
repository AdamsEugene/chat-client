import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow, red } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YelloRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    "&$checked": {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtons({ status, setSelectedValue }) {
  useEffect(() => {
    setSelectedValue(isNaN(status) ? "0" : status.toString());
  }, [status, setSelectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RedRadio
        checked={status === "0"}
        onChange={handleChange}
        value="0"
        name="radio-button-demo"
        inputProps={{ "aria-label": "A" }}
      />
      <YelloRadio
        checked={status === "1"}
        onChange={handleChange}
        value="1"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B" }}
      />
      <GreenRadio
        checked={status === "2"}
        onChange={handleChange}
        value="2"
        name="radio-button-demo"
        inputProps={{ "aria-label": "C" }}
      />
    </div>
  );
}
