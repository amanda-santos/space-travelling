import { ReactElement } from "react";

import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices/index.js";
import state from "../../.slicemachine/libraries-state.json";

const SliceSimulatorPage = (): ReactElement => {
  return (
    <SliceSimulator
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} components={components} />
      )}
      state={state}
    />
  );
};

export default SliceSimulatorPage;
