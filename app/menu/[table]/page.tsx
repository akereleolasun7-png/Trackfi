import React from 'react'
import MenuPage from '@/components/users/menu/menuPage'

interface PageProps {
  params: Promise<{ table: string }>;
}

export default function Page({ params }: PageProps) {
  return <MenuPage params={params} />
}