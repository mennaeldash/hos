import { mockSiteContent } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

/** Get site content by section key */
export async function getSiteContent(section) {
  // TODO: Replace with: return API.get(`/content/${section}`).then(res => res.data);
  return mockSiteContent[section] || null;
}

/** Get all site content */
export async function getAllSiteContent() {
  // TODO: Replace with: return API.get('/content').then(res => res.data);
  return Object.entries(mockSiteContent).map(([section, content]) => ({
    id: section,
    section,
    content,
    updated_at: new Date().toISOString(),
  }));
}

/** Update site content for a section */
export async function updateSiteContent(section, content) {
  // TODO: Replace with: return API.put(`/content/${section}`, { content }).then(res => res.data);
  mockSiteContent[section] = content;
  return { id: section, section, content, updated_at: new Date().toISOString() };
}
