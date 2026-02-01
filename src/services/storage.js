const DB_KEY = 'NEO_CURRICULUM_V1';

export const StorageService = {
  getAll: () => {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("DB Error", e);
      return [];
    }
  },
  getById: (id) => {
    return StorageService.getAll().find(p => p.id === id);
  },
  save: (project) => {
    const projects = StorageService.getAll();
    const index = projects.findIndex(p => p.id === project.id);
    const payload = { ...project, lastModified: Date.now() };
    
    if (index >= 0) projects[index] = payload;
    else projects.push({ ...payload, createdAt: Date.now() });
    
    localStorage.setItem(DB_KEY, JSON.stringify(projects));
  },
  delete: (id) => {
    const projects = StorageService.getAll().filter(p => p.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(projects));
  }
};