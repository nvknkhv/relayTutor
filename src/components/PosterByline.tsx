import * as React from "react";
import Image from "./Image";
import { useFragment } from 'react-relay';
import { PosterBylineFragment$key } from './__generated__/PosterBylineFragment.graphql';
import Hovercard from './Hovercard';
import PosterDetailsHovercardContents from './PosterDetailsHovercardContents';

const {useRef} = React;

export type Props = {
  poster: PosterBylineFragment$key;
};

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;


export default function PosterByline({ poster }: Props): React.ReactElement {
const data = useFragment(
    PosterBylineFragment,
    poster,
  );
  const hoverRef = useRef(null);

  if (data == null) {
    return null;
  }
  return (
    <div className="byline" ref={hoverRef}>
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef}>
              <PosterDetailsHovercardContents posterID={data.id} />
            </Hovercard>
    </div>
  );
}
