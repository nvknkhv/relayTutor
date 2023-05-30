import * as React from "react";
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from "react-relay";
import Story from "./Story";
import type {NewsfeedQuery as NewsfeedQueryType} from './__generated__/NewsfeedQuery.graphql';

const newsFeedQuery = graphql`
  query NewsfeedQuery {
    topStories {
    id
      ...StoryFragment
    }
  }
`;

export default function Newsfeed() {
const data = useLazyLoadQuery(newsFeedQuery, {});
  const stories = data.topStories;

  return (<div className="newsfeed">{stories.map((story) => (
      <Story key={story.id} story={story} />
   ))}</div>
  );
}
