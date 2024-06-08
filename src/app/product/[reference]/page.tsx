const ProductPage = async ({ params }: { params: { reference: string } }) => {
  const res = await fetch(`http://localhost:3000/products/${params.reference}`);
  const product = await res.json();

  return <div>ProductPage - {product.name}</div>;
};

export default ProductPage;
