import React, { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "./Widget";
import "../css/styles.css";

const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4 },
  ],
};

function Content({
  size: { width },
  isDraggable,
  hideResizable,
  onRemoveItem,
  items,
  affichage,
}) {
  const [layouts] = useState(getFromLS("layouts") || initialLayouts);

  const onLayoutChange = (_, layouts) => {
    saveToLS("layouts", layouts);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
        width={width}
        onLayoutChange={onLayoutChange}
        isDraggable={isDraggable}
        resizeHandles={["s", "e", "se"]}
        preventCollision={true}
        compactType={null}
        isBounded={true}
      >
        {items.map((key) => (
          <div
            key={key}
            className={hideResizable}
            data-grid={{ w: 3, h: 2, x: 0, y: 0 }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
              backgroundColor="#867ae9"
              affichage={affichage}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60, noPlaceholder: "false" })(Content);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
