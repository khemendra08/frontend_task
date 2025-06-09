// import { Product } from '@/types/product'

// export function ProductCardView({ data }: { data: Product[] }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {data.map(product => (
//         <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-xl transition hover:scale-[1.01]">
//           <img src={product.thumbnail} alt={product.title} className="h-40 object-contain mx-auto mb-2" />
//           <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
//           <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
//           <div className="mt-2 flex justify-between items-center">
//             <span className="text-blue-600 font-semibold">${product.price}</span>
//             <span className="text-sm bg-green-100 text-green-600 px-2 py-0.5 rounded">{product.rating}★</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
import { Product } from '@/types/product'

export function ProductCardView({ data }: { data: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map(product => (
        <div
          key={product.id}
          className="rounded-lg p-3 shadow hover:shadow-lg transition hover:scale-105 text-sm"
          style={{ backgroundColor: getBackgroundColor(product.category) }}
        >
          <img src={product.thumbnail} alt={product.title} className="h-32 object-contain mx-auto mb-2" />
          <h3 className="font-semibold text-md line-clamp-1">{product.title}</h3>
          <p className="text-xs text-gray-700 line-clamp-2">{product.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-blue-900 font-medium text-sm">${product.price}</span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">{product.rating}★</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function getBackgroundColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'beauty': return '#ffe4e6'; // light pink
    case 'smartphones': return '#e0f2fe'; // light blue
    case 'laptops': return '#ede9fe'; // lavender
    case 'groceries': return '#ecfccb'; // light green
    case 'fragrances': return '#fef9c3'; // pale yellow
    default: return '#f9fafb'; // light gray
  }
}
