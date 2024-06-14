const ProductPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3000/products/${params.id}`);
  const product = await res.json();

  if (product.error) throw new Error("Product not found");

  return <div>ProductPage - {product.name}</div>;
};

export default ProductPage;
