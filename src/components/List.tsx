import React from "react";
import { Package } from "../api";
import { FixedSizeList, ListChildComponentProps } from "react-window";

function ListItem({ result, style }: { result: Package, style: any }) {
  return (
    <div style={style}>
      <a href={result?.npmLink}>{result.name}</a>
      <p>{result?.description}</p>
    </div>
  )
}

type Props = {
  results: Package[];
  height: number;
  width: number;
}

export default function List({ height, width, results }: Props) {
  return (
    // Would ideally like to use VariableHeightList here, but seems complex
    // to calculate height dynamically.
    <FixedSizeList
      height={height}
      itemCount={results.length}
      itemSize={100}
      width={width}
    >
      {({ index, style }: ListChildComponentProps) => (
        <ListItem result={results?.[index]} style={style} />
      )}
    </FixedSizeList>
  )
}