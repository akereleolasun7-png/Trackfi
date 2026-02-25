
export const landingTablesApi = {
  getTables: async () => {
    const res = await fetch('/api/landing/tables');
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return res.json();
  },
};