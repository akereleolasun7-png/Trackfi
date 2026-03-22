import { MenuItem, CreateMenuItem } from "@/types";

export const adminMenuApi = {
  getMenus: async (page = 0, limit = 10): Promise<MenuItem[]> => {
    const offset = page * limit;
    const res = await fetch(`/api/admin/menus/getmenus?limit=${limit}&offset=${offset}`);
    if (res.status === 401) {
      throw new Error('Session expired');
    }
    if (!res.ok) {
      throw new Error('Failed to fetch menus');
    }
    return res.json();
  },
  editMenu: async (formData: FormData) => {

    const id = formData.get('id') as string;

    if (!id) {
      throw new Error('Menu ID is required');
    }
    const res = await fetch(`/api/admin/menus/edit`, {
      method: 'PUT',
      body: formData,
    });
    if (res.status === 401) {
      throw new Error('Session expired');
    }
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to edit menu');
    }

    return res.json();
  },
  deleteMenu: async (id: string) => {
    const res = await fetch(`/api/admin/menus/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (res.status === 401) {
      throw new Error('Session expired');
    }
    if (!res.ok) {
      throw new Error('Failed to delete menu');
    }
  },

  bulkUploadMenus: async (items: CreateMenuItem[]) => {
    const res = await fetch('/api/admin/menus/bulk-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    if (res.status === 401) {
      throw new Error('Session expired');
    }
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to bulk upload menus');
    }

    return res.json();
  },
  getAnalytics: async () => {
    const res = await fetch('/api/admin/menus/analytics');
    if (res.status === 401) throw new Error('Session expired');
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },
};
