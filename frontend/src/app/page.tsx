"use client";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "@/lib/graphql/queries";

const dynamic = "force-dynamic";

const Home = () => {
  const [createProduct, { data }] = useMutation(CREATE_PRODUCT);

  const handleMutation = async () => {
    await createProduct({
      variables: {
        createProductInput: {
          name: "Product 1",
          price: 100,
          stock: 10,
          descriptions: [],
          category_id: 1,
          subcategory_id: 1,
        },
      },
    }).catch((e) => console.log(e.message));
  };

  data && console.log(data);

  return (
    <main>
      <h1>Hello, Next.js 13 App Directory!</h1>
      <button onClick={handleMutation}>Mutation</button>
    </main>
  );
};

export default Home;
