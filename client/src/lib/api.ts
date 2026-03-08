export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const fetchApi = async (path: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'API Request Failed');
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('image')) {
        return res.blob();
    }

    return res.json();
};
