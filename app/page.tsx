'use client'

import { useEffect, useState } from 'react'
import { fetchData } from '@/lib/fetchData'
import { SearchBar } from '@/components/SearchBar'
import { Toggle } from '@/components/Toggle'
import { ProductCardView } from '@/components/ProductCardView'
import { ProductRowView } from '@/components/ProductRowView'
import { Product } from '@/types/product'

export default function HomePage() {
  const [data, setData] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'card' | 'row'>('card')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<'price' | 'rating'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const itemsPerPage = 5

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const result = await fetchData('https://dummyjson.com/products')
        setData(result.products)
        setFiltered(result.products)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const s = search.toLowerCase()
      const result = data.filter(p =>
        p.title?.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s)
      )
      setFiltered(result)
      setPage(1)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search, data])

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey] ?? 0
    const valB = b[sortKey] ?? 0
    return sortOrder === 'asc' ? valA - valB : valB - valA
  })

  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Product Directory</h1>
      <p className="text-sm mb-4">{filtered.length} Products Found</p>

      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <SearchBar value={search} onChange={setSearch} />
        <Toggle view={view} onChange={setView} />
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 mb-4">
        <label>Sort by:</label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as 'price' | 'rating')} className="border p-1 rounded">
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="border p-1 rounded">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        view === 'card' ? <ProductCardView data={paginated} /> : <ProductRowView data={paginated} />
      )}

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  )
}
