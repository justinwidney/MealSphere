import { NavBar } from "../components/NavBar";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/UrqlClient";
import { useRecipesQuery } from "../generated/graphql";
interface IndexProps {}

export const Index: React.FC<IndexProps> = ({}) => {
  const [{ data }] = useRecipesQuery();

  console.log(data, "my data");

  return (
    <>
      <NavBar />
      <div> Hello </div>
      {!data ? (
        <div> loading... </div>
      ) : (
        data.allRecipes.map((p) => <div key={p.id}>{p.recipeName}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
