export const quickMenuFilter = (searchQuery, quickMenu) => {
  const searchQueryFilters = searchQuery
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(i => i);

  return searchQueryFilters
    .reduce((menu, filter) => {
      const lowerFilter = filter.toLowerCase();
      return menu.map(parentItem => {
        let items = [];
        if (parentItem.name.toLowerCase().indexOf(lowerFilter) >= 0) {
          items = parentItem.items;
        } else {
          items = parentItem.items.filter(childItem => {
            const lowerDescription = childItem.description.toLowerCase();
            return lowerDescription.indexOf(lowerFilter) >= 0;
          });
        }
        return {
          name: parentItem.name,
          color: parentItem.color,
          items,
        };
      });
    }, quickMenu)
    .filter(i => !!i.items.length);
};

export const quickMenuHighlightResults = (result, searchQuery) => {
  const searchQueryFilters = searchQuery
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(i => i);

  const uniqueFilter = searchQueryFilters.filter((v, i, a) => a.indexOf(v) === i);
  const query = new RegExp(uniqueFilter.join('|'), 'gi');

  return result.map(parentItem => {
    if (parentItem.highlightedName) {
      parentItem.highlightedName = parentItem.highlightedName.replace(
        /(<strong style="background-color:#FF9">|<\/strong>)/gi,
        '',
      );
    }
    parentItem.highlightedName = parentItem.name.replace(query, matched => {
      return `<strong style="background-color:#FF9">${matched}</strong>`;
    });
    const childItems = parentItem.items.map(childItem => {
      if (childItem.highlightedDescription) {
        childItem.highlightedDescription = childItem.highlightedDescription.replace(
          /(<strong style="background-color:#FF9">|<\/strong>)/gi,
          '',
        );
      }
      childItem.highlightedDescription = childItem.description.replace(query, matched => {
        return `<strong style="background-color:#FF9">${matched}</strong>`;
      });
      return childItem;
    });
    parentItem.items = childItems;
    return parentItem;
  });
};
