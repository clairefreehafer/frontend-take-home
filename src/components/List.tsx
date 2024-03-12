import React from "react";
import { Package } from "../api";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";

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
}

export default function List({ results }: Props) {
  return (
    <AutoSizer>
      {(props: Size) => {
        return (
          // With more time, I'd experiment with VariableHeightList here.
          // Based on a cursory google, seems complex to implement. Could also
          // try truncating the description using CSS `text-overflow: ellpises`
          <FixedSizeList
            height={props.height}
            itemCount={results.length}
            itemSize={100}
            width={props.width}
          >
            {({ index, style }: ListChildComponentProps) => (
              <ListItem result={results?.[index]} style={style} />
            )}
          </FixedSizeList>
        )
      }}
    </AutoSizer>
  )
}