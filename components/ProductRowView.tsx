import { Product } from '@/types/product'

export function ProductRowView({ data }: { data: Product[] }) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Image</th>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left">Brand</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left">Rating</th>
          <th className="p-2 text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.map(product => (
          <tr key={product.id} className="border-t hover:bg-gray-50">
            <td className="p-2">
              <img src={product.thumbnail} alt={product.title} className="h-10 w-10 object-contain" />
            </td>
            <td className="p-2 font-semibold">{product.title}</td>
            <td className="p-2">{product.brand}</td>
            <td className="p-2 text-blue-600 font-medium">${product.price}</td>
            <td className="p-2">{product.rating}★</td>
            <td className="p-2">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}