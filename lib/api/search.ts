// fake results until backend is ready
import { mockSearchResults } from '@/lib/mock/search'
// swap with 

export async function fetchSearchResults(query: string) {
  // Replace this with your actual API call
    // const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    // if (!res.ok) throw new Error('Failed to fetch search results');
    // return res.json();
    // make a delay of 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));
    return mockSearchResults(query);
}