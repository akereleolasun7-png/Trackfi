import { useState } from 'react'
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(items.length / pageSize)
  const paginated = items.slice((page - 1) * pageSize, page * pageSize)
  return { page, setPage, totalPages, paginated }
}