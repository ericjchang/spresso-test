import type { User, ApiResponse } from '@/types/api.types';
import { API_BASE_URL } from './constants';

export const fetchUser = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
  sortBy: string | null = null,
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<ApiResponse<User>> => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`);
    const users: User[] = await res.json();

    let filteredUsers = users;

    if (search) {
      filteredUsers = users.filter(
        user =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = getNestedValue(a, sortBy);
        const bValue = getNestedValue(b, sortBy);

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortOrder === 'desc' ? 1 : -1;
          return 0;
        }
      });
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total,
      page,
      pageSize: totalPages,
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch users');
  }
};

const getNestedValue = (obj: any, path: string): any => {
  const value = path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);

  return value;
};
