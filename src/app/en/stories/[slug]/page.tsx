import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  notFound()
}
