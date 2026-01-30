import CreateProduct from "../../../component/CreateProduct";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return <CreateProduct isEdit={true} productId={productId} />;
}
