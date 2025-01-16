export const formatCategory = (category) => {
  const categoryMap = {
    "web-design": "Web Design",
    development: "Development",
    general: "General",
    databases: "Databases",
    seo: "Search Engines",
    marketing: "Marketing",
  };

  return categoryMap[category] || category; // Fallback to original if no match
};
